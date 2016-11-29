class UsersController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  respond_to :json

  def search
    search_param = "%#{params[:q]}%"
    @users = User.where('first_name ilike ? or last_name ilike ?', search_param, search_param)
    render json: @users.map { |ticket| UserSerializer.new(ticket, {}).serializable_hash }
  end
end
