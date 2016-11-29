class TicketChannel < ApplicationCable::Channel
  def follow(data)
    stop_all_streams
    stream_from "performers:#{data['performer_id'].to_i}:tickets"
    stream_from "owners:#{data['performer_id'].to_i}:tickets"
  end

  def unfollow
    stop_all_streams
  end
end
