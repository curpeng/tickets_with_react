class ApplicationController < ActionController::Base
  include ReactOnRails::Controller
  protect_from_forgery prepend: true, with: :exception
end
