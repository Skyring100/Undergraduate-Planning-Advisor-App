
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import NoSuchElementException
import json
import re
import os
import time

class Course:
    def __init__(self, id, name, desc, prereqs):
        self.id = id
        self.name = name;
        self.desc = desc;
        self.prereqs = prereqs

def create_webdriver() -> webdriver.Chrome:
    driver_options = Options()
    driver_options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=driver_options)
    return driver


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
    course_code_file = open("course_codes.txt", "w")
    course_code_file.write(all_values_string)
    course_code_file.close()

def scrape_all_courses(driver: webdriver.Chrome, subject: str):
    driver.get(f"https://tools.unbc.ca/course-catalogue?subj={subject}")
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//section[@id='results']/ul/li")))

    course_elements = driver.find_element(By.ID, "results").find_elements(By.XPATH, "//ul/li")
    print(len(course_elements))

    file_path = os.path.abspath(os.pardir + "/data/UNBC_course_data.json")
    course_list_file = open(file_path, "r+")
    current_data = json.load(course_list_file)
    for ele in course_elements:
        title = ele.find_element(By.TAG_NAME, "header").text
        id = subject + str([int(x) for x in filter(lambda title: title.isdigit(), title.split())][0])
        subEle = ele.find_element(By.TAG_NAME, "div").find_elements(By.TAG_NAME, "article")
        desc = subEle[0].text
        prereqElements = subEle[1].find_elements(By.TAG_NAME, "span")
        prereqs = []
        for prereqEle in prereqElements:
            prereqs.append(prereqEle.text)
        course_json = {
            'id': id,
            'title': title,
            'desc': desc,
            'prereqs': prereqs
        }

        current_data["all_courses"].append(course_json)
        course_list_file.seek(0)
    # Write the updated data back to the file
    json.dump(current_data, course_list_file, indent=4)
    course_list_file.close()
        
        
    





scraper = create_webdriver()
#get_course_information(scraper,'https://tools.unbc.ca/course-catalogue?subj=CPSC&crse=100')
#get_degree_information(scraper, 'https://www.unbc.ca/calendar/undergraduate/computer-science')
#scrape_all_courses(scraper, "CPSC")
scrape_course_codes(scraper)
scraper.quit()