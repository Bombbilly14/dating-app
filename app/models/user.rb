class User < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'recipient_id'
    
    has_many :sent_connections, class_name: "Connection", foreign_key: 'sender_id'
    has_many :received_connections, class_name: "Connection", foreign_key: 'recipient_id'

    has_secure_password
end
