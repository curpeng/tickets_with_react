require 'rails_helper'

feature "User can log in", js: true do
  given!(:user) { FactoryGirl.create(:user) }

  background { visit new_user_session_path }

  context 'user fills in correct email and password:' do
    scenario "sees 'Log out' link", js: true do
      fill_in_form(user.email, user.password)

      expect(page).to_not have_content('Log in')
      expect(page).to have_content('Log out')
    end
  end

  context 'user fills in incorrect email:' do
    scenario "sees 'Log in' link", js: true do
      fill_in_form(user.email.concat('s'), user.password)

      expect(page).to have_content('Log in')
      expect(page).to_not have_content('Log out')
    end

    scenario 'sees message with error' do
      fill_in_form(user.email.concat('s'), user.password)

      expect(page).to have_selector('#flash_alert', text: 'Invalid Email or password.')
    end
  end

  def fill_in_form(email, password)
    within('#new_user') do
      fill_in 'Email', with: email
      fill_in 'Password', with: password
      click_button 'Log in'
    end
  end
end
