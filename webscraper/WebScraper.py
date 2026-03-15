
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
import json, os, time

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

    driver.get(f"https://tools.unbc.ca/course-catalogue?subj={subject}")
    #Get the 'results' section of the page
    try:
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//section[@id='results']/ul/li")))
    except TimeoutException:
        print("Subject code "+str+" does not have any courses associated with it")
        return
    current_course_element = driver.find_element(By.ID, "results").find_element(By.XPATH, "//ul/*[1]")

    #For every element in the course list, extract id, title description and prerequisites
    i = 1
    while current_course_element != None:
        try:
            #Extract the data
            title = current_course_element.find_element(By.TAG_NAME, "header").text
            id = subject + str([int(x) for x in filter(lambda title: title.isdigit(), title.split())][0])
            subEle = current_course_element.find_element(By.TAG_NAME, "div").find_elements(By.TAG_NAME, "article")
            desc = subEle[0].text
            
            #Get all prereq information about the course
            prereqs = []
            try:
                prereqText = subEle[1].find_element(By.TAG_NAME, "ul").text
                print("prereqs: " + prereqText)
            except NoSuchElementException:
                pass
            


            #TODO: Parse prereq text to correctly model prereq with JSON object
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
                    .replace("\n", " ")
                    .replace(" or ", "~or~")
                    .replace(" and ", "~and~")
                    .replace("(", "~(~")
                    .replace(")","~)~")
                    .split("~")
                    )
                )
            )
    return parse_prereq_list(prereq_list)
    
def parse_prereq_list(prereq_list: list) -> dict:
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
                                prereq_list[i:j+1] = [parse_prereq_list(prereq_list[i+1:j])]
                                print("found the bracket at " + str(i) + "'s match at " + str(j))
                                found = True
                                break
                    if found: break
            except IndexError as e:
                print(e)
    print("all brackets gone")

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
            time.sleep(1)

    # flatten associativity spikes
    # (an associativity spike is a deep dict in the form of (object or (object or (object or object))) etc
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

    return prereq_list[0]

scraper = create_webdriver()
#scrape_all_courses(scraper)
scrape_all_subject_courses(scraper, "CPSC")
scraper.quit()
