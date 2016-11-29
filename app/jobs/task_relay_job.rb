class TaskRelayJob < ApplicationJob
  queue_as :default

  def perform(task, action)
    task_json = TicketSerializer.new(task, {}).to_json
    ActionCable.server.broadcast "performers:#{task.performer_id}:tickets", ticket: task_json, action: action, ticketId: task.id
    ActionCable.server.broadcast "owners:#{task.owner_id}:tickets", ticket: task_json, action: action, ticketId: task.id
  end
end
