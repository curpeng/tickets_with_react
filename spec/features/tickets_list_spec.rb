require 'rails_helper'

feature "User can see list of tickets;", js: true do
  given!(:task) { FactoryGirl.create(:task, :started, description: 'first') }
  given!(:task2) { FactoryGirl.create(:task, :finished, description: 'second', performer: task.owner) }
  given!(:task3) { FactoryGirl.create(:task, :finished) }
  given!(:user) { FactoryGirl.create(:user) }

  scenario "doesn't see ticket where he is not owner or performer" do
    open_tickets_page(user)

    expect(page).to_not have_content(task.description)
    expect(page).to_not have_content(task2.description)
    expect(page).to_not have_content(task3.description)
  end

  scenario "sees only tickets where he is owner or performer" do
    open_tickets_page(task.owner)

    expect(page).to have_content(task.description)
    expect(page).to have_content(task2.description)
    expect(page).to_not have_content(task3.description)
  end

  scenario "can sort tickets by description" do
    open_tickets_page(task.owner)
    find('td', text: 'Description').click
    expect(find('tbody tr:nth-child(1)')).to have_content('second')

    find('td', text: 'Description').click
    expect(find('tbody tr:nth-child(1)')).to have_content('first')
  end

  private

  def open_tickets_page(user)
    sign_in(user)
    visit root_path
    expect(page).to have_content("Your tickets")
  end
end
