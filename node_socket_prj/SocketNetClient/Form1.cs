using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Quobject.SocketIoClientDotNet.Client;

namespace SocketNetClient
{
    public partial class Form1 : Form
    {
        #region 변수선언
        Socket socket;
        string strUuid;
        bool isDisconnected;
        #endregion

        #region 메소드

        public Form1()
        {
            InitializeComponent();
            this.strUuid = string.Empty;
            this.txtShowMsg.ForeColor = Color.Navy;
            this.isDisconnected = true;
        }

        private void btnConnect_Click(object sender, EventArgs e)
        {
            Connection();
        }

        /// <summary>
        /// 서버연결
        /// </summary>
        private void Connection()
        {
            // 서버 Connect
            string strServerHost = System.Configuration.ConfigurationManager.AppSettings["serverHost"];
            int intServerPort = Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["serverPort"]);

            // 서버연결
            socket = IO.Socket(strServerHost);

            // 연결이벤트 발생시
            socket.On(Socket.EVENT_CONNECT, () =>
            {
                ShowBoxHandler("Dot net Client Connected!");
                this.isDisconnected = false;
            });

            // 연결이 끊겼을 때
            socket.On(Socket.EVENT_DISCONNECT, () =>
            {
                ShowBoxHandler("서버와의 연결이 끊어졌습니다.");
            });

            // 메시지 받았을 때
            ReceiveProcess();
        }

        /// <summary>
        /// 연결 끊기
        /// </summary>
        private void ClientDisconnect()
        {
            socket.Disconnect();
            isDisconnected = true;
        }

        /// <summary>
        /// ShowBox 컨트롤에 텍스트 입력
        /// </summary>
        private void ShowBoxHandler(string strText)
        {
            if (this.txtShowMsg.InvokeRequired)
            {
                this.txtShowMsg.Invoke(new Action<string>(ShowBoxHandler), strText);
            }
            else
            {
                this.txtShowMsg.Text += Environment.NewLine + strText;
                this.txtShowMsg.SelectionStart = this.txtShowMsg.TextLength;
                this.txtShowMsg.ScrollToCaret();
            }
        }
        #endregion

        #region 이벤트 핸들러
        /// <summary>
        /// 리시브 받은 json 데이터 처리
        /// </summary>
        /// <param name="strReceiveData">json 스트링 데이터</param>
        private void ReceiveProcess()
        {
            //JToken resultJson = JObject.Parse(strReceiveData);
            //JToken jData = resultJson["data"];
            //string strDefault = jData.ToString();
            //string strAction = resultJson["action"].ToString();

            // 서버로부터 메시지 받았을 때
            socket.On("client.msg.receive", (data) => ShowBoxHandler(data.ToString()));

        }

        /// <summary>
        /// OBJECT -> JSON STRING 로 변환
        /// </summary>
        private string ToJsonString(object objJson)
        {
            return JsonConvert.SerializeObject(objJson);
        }

        /// <summary>
        /// 연결끊기 이벤트 핸들러
        /// </summary>
        private void btnClose_Click(object sender, EventArgs e)
        {
            socket.Disconnect();
            ShowBoxHandler("서버와의 연결이 끊어졌습니다.");
        }

        /// <summary>
        /// 메시지 보내기
        /// </summary>
        private void btnSend_Click(object sender, EventArgs e)
        {
            if (isDisconnected == false)
            {
                socket.Emit("client.msg.send", this.txtSendMsg.Text);
                ShowBoxHandler("send msg:" + this.txtSendMsg.Text);
                this.txtSendMsg.Clear();
            } else
            {
                ShowBoxHandler("서버에 연결되어 있지 않습니다.");
            }
        }
        #endregion
    }
}
