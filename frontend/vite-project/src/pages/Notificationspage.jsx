import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, UserPlus, Phone } from "lucide-react";
import { Link } from "react-router";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New message from Maria",
      description: "Hi! Ready for our Spanish practice session?",
      time: "2 minutes ago",
      unread: true,
      icon: MessageSquare
    },
    {
      id: 2,
      type: "call",
      title: "Missed call from Takeshi",
      description: "French conversation practice - 15 minutes",
      time: "1 hour ago",
      unread: true,
      icon: Phone
    },
    {
      id: 3,
      type: "friend",
      title: "New connection request",
      description: "Sophie Laurent wants to practice English with you",
      time: "3 hours ago",
      unread: true,
      icon: UserPlus
    },
    {
      id: 4,
      type: "message",
      title: "Message from Alex",
      description: "Thanks for the great German lesson yesterday!",
      time: "1 day ago",
      unread: false,
      icon: MessageSquare
    },
    {
      id: 5,
      type: "system",
      title: "Weekly progress report",
      description: "You've completed 5 hours of language exchange this week!",
      time: "2 days ago",
      unread: false,
      icon: Bell
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer animate-fade-in ${
                  notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.type === 'message' ? 'bg-green-100' :
                    notification.type === 'call' ? 'bg-blue-100' :
                    notification.type === 'friend' ? 'bg-purple-100' :
                    'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      notification.type === 'message' ? 'text-green-600' :
                      notification.type === 'call' ? 'text-blue-600' :
                      notification.type === 'friend' ? 'text-purple-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">When you get notifications, they'll appear here</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/chat">
            <Button>
              Go to Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
