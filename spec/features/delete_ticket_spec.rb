require 'rails_helper'

feature "User can delete a ticket:", js: true do
  given!(:task) { FactoryGirl.create(:task, :started) }
  given(:first_ticket_sel) { 'tbody tr:nth-child(1)' }

  scenario "clicks on button 'Delete'" do
    sign_in(task.owner)
    visit root_path

    find("#{first_ticket_sel} .btn-danger").click
    expect(page).to_not have_selector(first_ticket_sel, text: task.description)
  end
end
