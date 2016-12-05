require 'rails_helper'

feature "User can update a ticket:", js: true do
  given!(:task) { FactoryGirl.create(:task, :started) }
  given(:first_ticket_sel) { 'tbody tr:nth-child(1)' }
  given(:btn_sel) { '.modal-footer .btn-primary' }
  given(:new_desc) { 'test desc' }
  given(:modal_sel) { '.modal-dialog' }

  scenario 'updates description' do
    sign_in(task.owner)
    visit root_path

    find(first_ticket_sel).click
    expect(page).to have_selector(modal_sel, text: task.description)
    find(btn_sel, text: 'Edit').click

    fill_in 'description', with: new_desc
    find(btn_sel, text: 'Save').click

    expect(page).to_not have_selector(modal_sel)
    expect(find(first_ticket_sel)).to have_content(new_desc)
  end
end
