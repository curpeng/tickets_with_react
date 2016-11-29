require 'rails_helper'

feature "User can see information about ticket", js: true do
  given!(:task) { FactoryGirl.create(:task, :started) }

  scenario "clicks on ticket ands sees popup with info" do
    open_popup
    expect(page).to have_selector('.modal-dialog', text: task.description)
  end

  scenario "user is able to close popup" do
    open_popup

    within('.modal') do
      find('.close').click
    end

    expect(page).to_not have_selector('.modal-dialog')
  end

  def open_popup
    sign_in(task.owner)
    visit root_path

    find('tbody tr:nth-child(1)').click
  end
end
