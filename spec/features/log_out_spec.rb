require 'rails_helper'

feature "User can log out", js: true do
  given!(:user) { FactoryGirl.create(:user) }

  background do
    sign_in user
    visit root_path
  end

  scenario "user clicks on 'Log out' link" do
    click_link('Log out')

    expect(page).to_not have_content('Log out')
    expect(page).to have_content('Log in')
  end
end
