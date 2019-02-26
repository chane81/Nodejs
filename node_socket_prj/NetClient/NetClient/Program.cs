using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;


namespace NetClient
{
    class Program
    {
        static string strHost = "127.0.0.1";
        static int intPort = 5001;
        static TcpClient client;

        static void Main(string[] args)
        {
            Connect();
            string strMsg = string.Empty;

            while (strMsg != "4")
            {
                Console.ResetColor();
                Console.Write("\n\n보낼 내용을 입력해주세요!");
                strMsg = Console.ReadLine();
                SendData(strMsg);
            }
        }

        static void Connect()
        {
            client = new TcpClient();
            client.Connect(strHost, intPort);
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("TcpClient connected");
        }

        static void SendData(string strData)
        {
            if (client == null)
            {
                Console.WriteLine("client is null");
                return;
            }

            // send
            NetworkStream stream = client.GetStream();
            byte[] bytSendMsg = UTF8Encoding.ASCII.GetBytes(strData);
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("sending:" + strData);
            stream.Write(bytSendMsg, 0, bytSendMsg.Length);

            // receive
            byte[] bytReceiveMsg = new byte[client.ReceiveBufferSize];
            int bytRead = stream.Read(bytReceiveMsg, 0, bytReceiveMsg.Length);
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("Received:" + Encoding.UTF8.GetString(bytReceiveMsg, 0, bytRead));
        }
    }
}
