class TicketSerializer < ActiveModel::Serializer
  attributes :id, :description, :state, :owner, :performer, :created_at

  def owner
    info_of(object.owner)
  end

  def performer
    info_of(object.performer)
  end

  def created_at
    object.created_at.iso8601
  end

  private

  def info_of(user)
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name
    }
  end
end
