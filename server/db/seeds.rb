User.destroy_all
Message.destroy_all
Connection.destroy_all



    puts "🌱 Seeding data..."

    u1 = User.create(name: 'billy', age: 30, password: 'password', email: 'billy@example.com', location: "Oregon", gender: 'He/Him', gender_preference: ['She/Her', 'They/Them'])
    u2 = User.create(name: 'Ian', age: 21, password: 'password', email: 'ian@example.com', location: "LV", gender: 'He/Him')
    u3 = User.create(name: 'jason', age: 25, password: 'password', email: 'jason@example.com', location: "Irvine", gender: 'He/Him')
    u4 = User.create(name: 'keith', age: 26, password: 'password', email: 'keith@example.com', location: "California", gender: 'He/Him', gender_preference: ['He/Him'])
    u7 = User.create(name: 'Tennifer', age: 29, password: 'password', email: 'Tennifer@example.com', location: "Eagleton", gender: 'She/Her', gender_preference: ['He/Him'])
    u8 = User.create(name: 'April', age: 26, password: 'password', email: 'april@example.com', location: "Oregon", gender: 'She/Her', gender_preference: ['He/Him'])
    u9 = User.create(name: 'Vanessa', age: 26, password: 'password', email: 'vanessa@example.com', location: "California", gender: 'She/Her', gender_preference: ['He/Him'])
    u5 = User.create(name: 'Ix', age: 26, password: 'password', email: 'ix@example.com', location: "Cali", gender: 'They/Them')
    u6 = User.create(name: 'Bobert', age: 26, password: 'password', email: 'bobert@example.com', location: "Phoenix", gender: 'He/Him')
    u10 = User.create(name: 'John', age: 26, password: 'password', email: 'john@example.com', location: "Nevada", gender: 'He/Him')
    u11 = User.create(name: 'Mary', age: 30, password: 'password', email: 'mary@example.com', location: "Washington", gender: 'She/Her')
    u12= User.create(name: 'Cindy', age: 31, password: 'password', email: 'cindy@example.com', location: "Washington", gender: 'She/Her')
    u13= User.create(name: 'Hannah', age: 35, password: 'password', email: 'hannah@example.com', location: "California", gender: 'She/Her')
    u14 = User.create(name: 'Emma', age: 26, password: 'password', email: 'emma@example.com', location: "Oregon", gender: 'She/Her')
    u15 = User.create(name: 'Laura', age: 25, password: 'password', email: 'laura@example.com', location: "Oregon", gender: 'She/Her')


    c1 = Connection.create(accepted: true, sender_id: u1.id, recipient_id: u7.id)
    c2 = Connection.create(accepted: true, sender_id: u7.id, recipient_id: u4.id)


    puts "🌱 Seeding Done!"