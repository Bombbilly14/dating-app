class Connection < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'recipient_id'
    belongs_to :recipient, class_name: 'User', foreign_key: 'recipient_id'
    belongs_to :sender, class_name: 'User', foreign_key: 'sender_id'


    

    

end
