class TicketsController < ApplicationController
  before_action :authenticate_user!

  def index
    @tickets = current_user.tickets.map { |ticket| TicketSerializer.new(ticket, {}).serializable_hash }
  end
end
