class TicketsController < ApplicationController
  before_action :authenticate_user!
  before_action :initialize_store
  skip_before_action :verify_authenticity_token

  def index
    @states = Task::STATES.values
    @tickets = current_user.tickets.map { |ticket| TicketSerializer.new(ticket, {}).serializable_hash }
  end

  def update
    @ticket = current_user.tickets.find(params[:id])
    @ticket.update_attributes(ticket_params)

    respond_to do |format|
      format.json { render json: TicketSerializer.new(@ticket, {}).to_json }
    end
  end

  def destroy
    @ticket = current_user.tickets.find(params[:id])
    @ticket.delete

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def initialize_store
    redux_store("Tickets", props: { ticketsData: { tickets: [], chosenTicketId: -1} })
  end

  def ticket_params
    params.require(:ticket).permit(:description, :performer_id, :state)
  end
end
