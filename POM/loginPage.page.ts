import {Page,Locator,expect} from "@playwright/test"

class LoginPage{
    page:Page
    userName:Locator
    password:Locator
    loginButton:Locator
    loginLogo:Locator
    homePageDashboard:Locator
    userProfileMenu:Locator
    logoutOption:Locator

    constructor(page:Page){
        this.page = page
        this.userName = page.getByPlaceholder("Username",{exact:true})
        this.password = page.getByPlaceholder("Password",{exact:true})
        this.loginButton = page.getByRole("button",{name:" Login "})
        this.loginLogo = page.locator("//img[@src='/web/images/ohrm_branding.png?v=1783336755185']")
        this.homePageDashboard = page.locator("//span[@class='oxd-topbar-header-breadcrumb']")
        this.userProfileMenu = page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']")
        this.logoutOption = page.getByRole("menuitem",{name:"Logout"})
    }

    async login(url:string,username:string,password:string) {
        await this.page.goto(url)
        await expect(this.loginLogo).toBeVisible()

        await this.userName.fill(username)
        await this.password.fill(password)
        await Promise.all([
            this.loginButton.click(),
            expect(this.homePageDashboard).toBeVisible()
        ]) 
    }

    async logout() {
        await this.userProfileMenu.click()
        await Promise.all([
            await this.logoutOption.click()
        ])
        //await expect(this.loginLogo).toBeVisible()
    }
}

export default LoginPage