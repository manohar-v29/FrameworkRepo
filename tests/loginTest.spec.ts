import {test} from "@playwright/test"
import data from "../DDT/OrangeHRMData.json"
import loginPage from "../POM/loginPage.page"
import {browserPage} from "../utilities/OrangeHRMUtilities"

test("Login Logout end to end test",async({browser})=>{
    const page = await browserPage(browser)
    const login = new loginPage(page)

    await test.step("When the user logs into the OrangeHRM",async () =>{
        await login.login(data.url,data.username,data.password)
    })

    await test.step("When the user logs out from OrangeHRM",async () => {
        await login.logout()
    })
})