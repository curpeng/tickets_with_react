class Task < ApplicationRecord
  STATES = {
    unstarted: 'unstarted',
    started: 'in-progress',
    finished: 'finished'
  }.freeze

  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  belongs_to :performer, class_name: 'User', foreign_key: 'performer_id'

  validates :owner_id, :performer_id, :description, presence: true
  validate :correct_state

  after_commit :notify_about_create, on: [:create]
  after_commit :notify_about_update, on: [:update]
  before_commit :notify_about_destroy, on: [:destroy]

  private

  def notify_about_create
    TaskRelayJob.perform_later(self, 'add')
  end

  def notify_about_update
    TaskRelayJob.perform_later(self.reload, 'update')
  end

  def notify_about_destroy
    TaskRelayJob.perform_later(self, 'delete')
  end

  def correct_state
    unless STATES.values.include?(state)
      errors.add :base, "Task state is incorrect. Possible values are: #{STATES.values}"
    end
  end
end
