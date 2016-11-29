class Task < ApplicationRecord
  STATES = {
    unstarted: 'unstarted',
    started: 'in-progress',
    finished: 'finished'
  }.freeze

  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  belongs_to :performer, class_name: 'User', foreign_key: 'performer_id'

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
end
