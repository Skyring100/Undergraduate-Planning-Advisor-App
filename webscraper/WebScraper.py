
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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

    print(f"Course Name: {title} Prereqs: {prereqs}\nDescription:\n{desc}")

def get_degree_information(driver: webdriver.Chrome, degreeURL: str):
    driver.get(degreeURL)
    # Get the normal major for this degree page (ie. no honour nor joint major section)
    degree_header = driver.find_element(By.CLASS_NAME, "field__item").find_element(By.TAG_NAME, "div").find_element(By.TAG_NAME, "h2")
    print(degree_header.tag_name)
    next_sibling = degree_header.find_elements(By.XPATH, "/following-sibling::*")
    print(next_sibling)





scraper = create_webdriver()
#get_course_information(scraper,'https://tools.unbc.ca/course-catalogue?subj=CPSC&crse=100')
get_degree_information(scraper, 'https://www.unbc.ca/calendar/undergraduate/computer-science')
scraper.quit()