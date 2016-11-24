FactoryGirl.define do
  factory :task do
    performer { FactoryGirl.create(:user) }
    owner { FactoryGirl.create(:user) }
    description { Faker::Lorem.sentence(3) }
    state { Task::STATES[:unstarted] }

    trait :started do
      state { Task::STATES[:started] }
    end

    trait :finished do
      state { Task::STATES[:finished] }
    end
  end
end
