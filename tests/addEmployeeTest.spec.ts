import {test} from "@playwright/test"
import data from "../DDT/OrangeHRMData.json"
import loginPage from "../POM/loginPage.page"
import createEmployee from "../POM/addEmployeePage.page"
import {browserPage,createName} from "../utilities/OrangeHRMUtilities"

test("Create a new employee data test",async({browser})=>{
    const page = await browserPage(browser)
    const login = new loginPage(page)
    const newEmployee = new createEmployee(page)

    await test.step("When the user logs into the OrangeHRM",async () =>{
        await login.login(data.url,data.username,data.password)
    })

    await test.step("Navigatimg to PIM",async () => {
        await newEmployee.navigateToPIM()
    })

    await test.step("Creating new employee",async () =>{
        await newEmployee.createEmployee(await createName(4),await createName(0),await createName(6))
    })
        
    await test.step("When the user logs out from OrangeHRM",async () => {
        await login.logout()
    })
})