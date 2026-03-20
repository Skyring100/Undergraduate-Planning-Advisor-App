
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
import json, os, time
import sqlite3

COURSE_CODE_FILE = "course_codes.txt"
#UNBC_COURSE_DATA_FILE = "/app/data/UNBC_course_data.json"
#TEST JSON FILE, NOT THE FINAL FILE 
UNBC_COURSE_DATA_FILE = "/app/data/test.json"

def create_webdriver() -> webdriver.Chrome:
    driver_options = Options()
    driver_options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=driver_options)
    return driver

'''
def get_course_information(driver: webdriver.Chrome, courseURL: str):
    driver.get(courseURL)
    # Wait until dynamic course elements load
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//section[@id='results']/ul/li")))

    # Find the results section
    mainEle = driver.find_element(By.ID, "results")

    title = mainEle.find_element(By.TAG_NAME, "header").text
    
    subEle = mainEle.find_element(By.TAG_NAME, "div").find_elements(By.TAG_NAME, "article")
    desc = subEle[0].text

    prereqElements = subEle[1].find_elements(By.TAG_NAME, "span")
    prereqs = []
    for prereqEle in prereqElements:
        prereqs.append(prereqEle.text)

    #print(f"Course Name: {title} Prereqs: {prereqs}\nDescription:\n{desc}")
    return title, desc, prereqs

def get_degree_information(driver: webdriver.Chrome, degreeURL: str):
    required_courses = []
    driver.get(degreeURL)
    # Get the normal major for this degree page (ie. no honour nor joint major section)
    degree_header = driver.find_element(By.ID, "program-requirements")
    print(degree_header.text)
    next_sibling = degree_header.find_element(By.XPATH, "following-sibling::*[1]")
    while next_sibling.tag_name != "h2":
        if next_sibling.tag_name == "table":
            course_rows = next_sibling.find_element(By.TAG_NAME, "tbody").find_elements(By.TAG_NAME,"tr")
            for row in course_rows:
                data_cell = row.find_element(By.TAG_NAME, "td")
                required_courses.append(data_cell.text)
                print(data_cell.text)
        next_sibling = next_sibling.find_element(By.XPATH, "following-sibling::*[1]")
    print(required_courses)
''' 

def scrape_course_codes(driver: webdriver.Chrome):
    driver.get("https://tools.unbc.ca/course-catalogue")
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "panel")))
    #Click dropdown menu to see all course code selections
    driver.find_element(By.CLASS_NAME, "panel").find_element(By.XPATH, "//span").click()

    #For every option in the drop down menu, extract the course code
    all_values_string = ""
    current_option_element = driver.find_element(By.ID, "filter-subject").find_element(By.XPATH,".//*[1]")
    i = 1
    while current_option_element != None:
        try:
            #Get the value attribute in the 'option' element which has the course code
            all_values_string += current_option_element.get_attribute("value")+"\n"
            #Try to get the next sibling option
            try:
                current_option_element = current_option_element.find_element(By.XPATH, "following-sibling::*[1]")
            except NoSuchElementException:
                current_option_element = None
            i += 1
        except StaleElementReferenceException:
            #If web scraper times out, use driver to get our current working element again
            current_option_element = driver.find_element(By.ID, "filter-subject").find_element(By.XPATH,f".//*[{i}]")

    #Write course codes to file
    course_code_file = open(COURSE_CODE_FILE, "w")
    course_code_file.write(all_values_string)
    course_code_file.close()

def scrape_all_subject_courses(driver: webdriver.Chrome, subject: str):
    #Open course data file that we will write to
    file_path = os.path.abspath(os.pardir + UNBC_COURSE_DATA_FILE)
    course_list_file = open(file_path, "r+")
    current_data = json.load(course_list_file)
    conn = sqlite3.connect("../backend/db/database.db")
    cur = conn.cursor()

    driver.get(f"https://tools.unbc.ca/course-catalogue?subj={subject}")
    #Get the 'results' section of the page
    try:
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//section[@id='results']/ul/li")))
    except TimeoutException:
        print("Subject code "+subject+" does not have any courses associated with it")
        return
    current_course_element = driver.find_element(By.ID, "results").find_element(By.XPATH, "//ul/*[1]")

    #For every element in the course list, extract id, title description and prerequisites
    i = 1

    # get the last element in the prereqs
    # doesnt necessarily need to be ordered like 1, 2, 3, 4 but should still be a total order
    cur.execute("SELECT MAX(ordering) FROM prereq;")
    k = cur.fetchall()[-1][0]
    if k is None: k = 1
    while current_course_element != None:
        try:
            #Extract the data
            title = current_course_element.find_element(By.TAG_NAME, "header").text
            id = (subject + str([int(x) for x in filter(lambda title: title.isdigit(), title.split())][0])).replace("\n", "")
            subEle = current_course_element.find_element(By.TAG_NAME, "div").find_elements(By.TAG_NAME, "article")
            desc = subEle[0].text
            
            #Get all prereq information about the course
            prereqs = []
            try:
                prereqText = subEle[1].find_element(By.TAG_NAME, "ul").text
                print("prereqs: " + prereqText)
            except NoSuchElementException:
                prereqText = ""
                pass
            if prereqText != "":
                prereq_dict = parse_prereqs(prereqText)
                print(prereq_dict)
                prereqs = prereq_dict
            #Create a JSON object for the course data
            course_json = {
                'id': id,
                'title': title,
                'desc': desc,
                'prereqs': prereqs
            }

            #Append the course data to the master JSON object
            current_data["all_courses"].append(course_json)
            course_list_file.seek(0)

            # add it to the SQL file (you dont have to keep this one in)
            # TODO: port this to javascript so it is better
            # TODO: scrape course credit value
            

            print("COURSE: " + id)
            print(f"pushing {(id, title, desc)}")
            query = """
            INSERT OR REPLACE INTO course
                (course_id, title, description) 
                VALUES (?, ?, ?);
            """
            cur.execute(query, (id, title, desc))

            if (type(prereqs) == dict):
                for j in fit_list_to_db(id, make_compressed_notation(prereqs)):
                    # TODO: scrape course corequisite status
                    print("\tPREREQ : " + j[1])
                    print(f"\tpushing {(*j, k)}")
                    query = """
                    INSERT OR REPLACE INTO prereq
                        (course_id, prereq_id, is_coreq, min_grade, nesting, ordering) 
                        VALUES (?, ?, ?, ?, ?, ?);
                    """
                    cur.execute(query, (*j, k))
                    k += 1

                

            #Try to get the next sibling option
            try:
                current_course_element = current_course_element.find_element(By.XPATH, "following-sibling::*[1]")
            except NoSuchElementException:
                current_course_element = None
            i += 1
        except StaleElementReferenceException:
            #If web scraper times out, use driver to get our current working element again
            current_course_element = driver.find_element(By.ID, "results").find_elements(By.XPATH, f"//ul/*[{i}]")
    # Write the updated data back to the file
    json.dump(current_data, course_list_file, indent=4)
    course_list_file.close()
    conn.commit()
    conn.close()
        
        
    
def scrape_all_courses(driver : webdriver.Chrome):
    if not os.path.exists(COURSE_CODE_FILE):
        scrape_course_codes(driver)
    subject_code_file = open(COURSE_CODE_FILE,'r')

    for line in subject_code_file:
        print(line)
        scrape_all_subject_courses(driver, line)

def parse_prereqs(prereqText: str) -> dict:
    # returns a dict which can subsequently be converted to json
    prereq_list = list(
            filter(
                (lambda x: x != ""), 
                map(
                    (lambda x: x.strip()), 
                    prereqText
                    .replace("    ", "")        # quad spaces appear strangely often in prereqs
                                                # for no reason at all
                    .replace("\nor", "~or~")    # these three cases need to exist
                    .replace("\nand", "~and~")  # so multi-line prereqs are handled discretely
                    .replace("\n", "~andLast~") # bare newline is AND, but handled later

                    .replace(" or ", "~or~")    # handle basic booleans
                    .replace(" and ", "~and~") 

                    .replace("(", "~(~")        # finally handle parentheses
                    .replace(")","~)~")
                    .split("~")                 # and tokenize
                    )
                )
            )
    return parse_prereq_list(prereq_list)
    
def parse_prereq_list(prereq_list: list) -> dict:
    print()
    print("parsing " + str(prereq_list))
    # handle all brackets first
    while any(x in prereq_list for x in "()"):
        print("debracketing " + str(prereq_list))
        for i in range(len(prereq_list)):
            ele = prereq_list[i]
            try:
                # recursive case handled here
                if ele == "(":
                    print("found a bracket at " + str(i))
                    found = False
                    # match bracket, accounting for nesting
                    nest_level = 1
                    for j in range(i + 1, len(prereq_list)):
                        if prereq_list[j] == "(":
                            nest_level += 1
                        elif prereq_list[j] == ")":
                            nest_level -= 1
                            if nest_level == 0:
                                print("found the bracket at " + str(i) + "'s match at " + str(j))
                                prereq_list[i:j+1] = [parse_prereq_list(prereq_list[i+1:j])]
                                found = True
                                break
                    if found: break
            except IndexError as e:
                print(e)
    print("all brackets gone")
    print()

    # handle other two cases
    while len(prereq_list) > 1:
        mod_made = False
        print("parsing " + str(prereq_list))
        for i in range(len(prereq_list)):
            ele = prereq_list[i]
            try:
                # recursive case handled here
                if ele == "and":
                    print("found an AND at " + str(i))
                    prereq_list[i-1:i+2] = [{"relation": "and", "on": [prereq_list[i-1], prereq_list[i+1]]}]
                    mod_made = True
                    break
                elif ele == "or":
                    print("found an OR at " + str(i))
                    prereq_list[i-1:i+2] = [{"relation": "or", "on": [prereq_list[i-1], prereq_list[i+1]]}]
                    mod_made = True
                    break
            except IndexError as e:
                print(e)
        if mod_made == False:
            # start handling and_lasts if you can't make another mod
            if "andLast" in prereq_list:
                break

    while len(prereq_list) > 1:
        mod_made = False
        print("parsing " + str(prereq_list))
        for i in range(len(prereq_list)):
            ele = prereq_list[i]
            try:
                # recursive case handled here
                if ele == "andLast":
                    print("found an AND at " + str(i))
                    prereq_list[i-1:i+2] = [{"relation": "and", "on": [prereq_list[i-1], prereq_list[i+1]]}]
                    mod_made = True
                    break
            except IndexError as e:
                print(e)
        if mod_made == False:
            # start handling and_lasts if you can't make another mod
            raise ValueError("list couldn't be parsed down; might be malformed")
                           

    # flatten associativity spikes
    # (an associativity spike is a deep dict in the form of (object or (object or (object or object))) etc
    print()
    print("flattening associativity spikes in: " + str(prereq_list[0]))
    ret = prereq_list[0]
    mod_made = True  # arbitrarily large number
    while mod_made:  # until we don't make any changes to associativity spikes
        mod_made = False
        if type(ret) == dict:
            for j in ret["on"]:
                if type(j) == dict and j["relation"] == ret["relation"]:
                    print(f"spike detected: type {ret['relation']}, element {ret['on'].index(j)}")
                    k = ret["on"].index(j)
                    ret["on"][k:k+1] = j["on"]
                    mod_made = True
                    break

    # finally, wrap course IDs in objects
    # this will also be used to split the course's minimum grade off of courses that have one
    def wrap_courses(current: dict | str) -> dict:
        if type(current) == dict:
            if current["relation"] == "single": return current
            # recurse
            # wrap the course's children
            print("Recurring on " + str(current))
            return {
                    "relation": current["relation"],
                    "on": list(map(wrap_courses, current["on"])),
                }
        elif type(current) == str:
            print("Wrapping in single: " + current)

            course_partition = current.split(" minimum grade of ")
            min_grade = course_partition[1] if len(course_partition) > 1 else "P"
            # wrap
            return {
                    "relation": "single",
                    "name": course_partition[0],
                    "min_grade": min_grade,
                }

    new_ret = wrap_courses(ret)
    print()
    print("Final prereq list: " + str(new_ret))
    print()
    print()
    return new_ret

def make_compressed_notation(root: dict, nesting: int = 0) -> list[tuple[str, str, int]]:
    # converts a nested JSON dictionary to a tuple of c_iDs, minimum grades, and nesting levels
    # nesting levels are explained in about_nesting.md
    if nesting == 0:
        print("compressing dict:")
        print(f"\t{root}")
    out = []
    # process the basic dictionary
    # this is done recursively
    match root["relation"]:
        case "single":
            print(f"{'  ' * nesting}processing {root['name']} as single, nesting {nesting}")
            out.append((root["name"], root["min_grade"], nesting))
        case "and":
            new_nesting = nesting + 1 if nesting % 2 == 0 else nesting + 2
            print(f"{'  ' * nesting}processing AND at nesting {nesting} with nesting {new_nesting} for children")
            for ele in root["on"]:
                # use an odd number for nesting
                out.extend(make_compressed_notation(ele, new_nesting))
            # close any brackets the recursion opened
            out[-1] = (out[-1][0], out[-1][1], nesting)
        case "or":
            new_nesting = nesting + 2 if nesting % 2 == 0 else nesting + 1
            print(f"{'  ' * nesting}processing OR at nesting {nesting} with nesting {new_nesting} for children")
            for ele in root["on"]:
                # use an even number for nesting
                out.extend(make_compressed_notation(ele, new_nesting))
            # close any brackets the recursion opened
            out[-1] = (out[-1][0], out[-1][1], nesting)

    if nesting == 0:
        print("final return:")
        for i in out:
            print(i)
    return out;

def fit_list_to_db(course_id: str, unpadded: list[tuple[str, str, int]]) -> list[tuple[str, str, int, str, int]]:
    print("fitting list:")
    for i in unpadded:
        print(f"\t{i}")
    ret = []
    for i in unpadded:
        ret.append((course_id, i[0], None, i[1], i[2]));
    return ret

def main():
    scraper = create_webdriver()
    scrape_all_courses(scraper)
    #scrape_all_subject_courses(scraper, "CHEM")
    scraper.quit()

if __name__ == "__main__":
    main()
