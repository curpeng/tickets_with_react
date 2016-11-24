RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.clean_with :truncation
    DatabaseCleaner.strategy = :transaction
  end

  config.around(:each) do |spec|
    if spec.metadata[:js]
      # JS => doesn't share connections => can't use transactions
      spec.run
      DatabaseCleaner.clean_with :deletion
    else
      # No JS/Devise => run with Rack::Test => transactions are ok
      DatabaseCleaner.start

      spec.run

      begin
        DatabaseCleaner.clean
      rescue PG::InFailedSqlTransaction
        ActiveRecord::Base.connection.execute 'ROLLBACK'
      end

      # see https://github.com/bmabey/database_cleaner/issues/99
      begin
        ActiveRecord::Base.connection.send :rollback_transaction_records, true
      rescue
        nil
      end
    end
  end
end
