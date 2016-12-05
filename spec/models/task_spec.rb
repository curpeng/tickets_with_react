require 'rails_helper'

RSpec.describe Task, type: :model do
  context 'validations' do
    context 'task is invalid ' do
      shared_examples 'error' do
        it 'returns error' do
          task.save
          expect(task.errors).to_not be_empty
        end
      end

      context "doesn't have performer_id" do
        let(:task) { FactoryGirl.build(:task, performer_id: nil) }

        include_examples 'error'
      end

      context "doesn't have owner_id" do
        let(:task) { FactoryGirl.build(:task, owner_id: nil) }

        include_examples 'error'
      end

      context "doesn't have description" do
        let(:task) { FactoryGirl.build(:task, description: nil) }

        include_examples 'error'
      end

      context 'has wrong state' do
        let(:task) { FactoryGirl.build(:task, state: 'wrong') }

        include_examples 'error'
      end
    end

    context 'task is valid' do
      it "doesn't have errors" do
        task = FactoryGirl.build(:task)
        task.save

        expect(task.errors).to be_empty
      end
    end
  end
end
