import { test, expect } from "@playwright/test"

test.describe("Testing Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })
  test("Has links and utility buttons", async ({ page }) => {
    await page.goto("/")
    //links
    await expect(page.getByRole("link", { name: "Mới nhất" })).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Nghệ sĩ nổi tiếng" })
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Mạng xã hội" })
    ).toBeVisible()
    await expect(page.getByRole("button", { name: "Hot girls" })).toBeVisible()
    //buttons
    //   await expect(page.getByRole('button',{})).toBeVisible()
  })

  test("Topics in Nghệ sĩ nổi tiếng", async({page})=>{
    //Nghệ sĩ nổi tiếng
    await page.getByRole("button", { name: "Nghệ sĩ nổi tiếng" }).click()
    await expect(page.getByRole("link",{name:"FAPtv"})).toBeVisible()
    await expect(page.getByRole("link",{name:"Rapper"})).toBeVisible()
    await expect(page.getByRole("link",{name:"Diễn viên"})).toBeVisible()
    await expect(page.getByRole("link",{name:"Ca sĩ"})).toBeVisible()
    await expect(page.getByRole("link",{name:"Hoa hậu"})).toBeVisible()
   

  })
  test("Topics in Mạng xã hội", async({page})=>{
    
    await page.getByRole("button", { name: "Mạng xã hội" }).click()
    await expect(page.getByRole("link",{name:"Tiktoker"})).toBeVisible()
  })

  test("Topics in Hot girls", async({page})=>{
    await page.getByRole("button", { name: "Hot girls" }).click()
    await expect(page.getByRole("link",{name:"Hot Girl"})).toBeVisible()
    await expect(page.getByRole("link",{name:"Gymer"})).toBeVisible()

  })

  test("Able to go to girl xinh bio page in navbar", async ({ page }) => {
    await page.getByRole("button", { name: "Nghệ sĩ nổi tiếng" }).click()
    await page.getByRole("link", { name: "Vân Anh" }).click()
    await expect(
      page.getByRole("heading", { level: 1, name: "Vân Anh" })
    ).toBeVisible()
  })
})
