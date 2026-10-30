import {Page, Locator, expect} from "@playwright/test"

class AddEmployee{
    page:Page
    dashboardPage:Locator
    PIMOption:Locator
    addEmployeeButton:Locator
    employeeFirstName:Locator
    employeeMiddleName:Locator
    employeeLastName:Locator
    employeeId:Locator
    saveButton:Locator
    personalDetails:Locator

    constructor(page:Page){
        this.page = page
        this.dashboardPage = page.locator("//span[@class='oxd-topbar-header-breadcrumb']")
        this.PIMOption = page.getByText("PIM",{exact:true})
        this.addEmployeeButton = page.getByRole("button",{name:" Add "})
        this.employeeFirstName = page.getByPlaceholder("First Name",{exact:true})
        this.employeeMiddleName = page.getByPlaceholder("Middle Name",{exact:true})
        this.employeeLastName = page.getByPlaceholder("Last Name",{exact:true})
        this.employeeId = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]")
        this.saveButton = page.getByRole("button",{name:" Save "})
        this.personalDetails = page.locator("//h6[text()='Personal Details']")
    }

    async navigateToPIM(){
        await this.PIMOption.click()
    }

    async createEmployee(firstname:string, middlename:string, lastname:string){
        await this.addEmployeeButton.click()
        await this.employeeFirstName.fill(firstname)
        await this.employeeMiddleName.fill(middlename)
        await this.employeeLastName.fill(lastname)
        await expect(this.employeeId).not.toBeEmpty()
        await this.saveButton.click()
        await this.page.waitForTimeout(5000)
        await expect(this.personalDetails).toBeVisible()
    }
}

export default AddEmployee