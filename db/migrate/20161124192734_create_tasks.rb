class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.integer :performer_id
      t.integer :owner_id
      t.text :description
      t.string :state, default: Task::STATES[:unstarted]

      t.timestamps
    end

    add_index :tasks, :performer_id
    add_index :tasks, :owner_id
  end
end
