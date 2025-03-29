import React ,{useState , useRef} from "react";

const ChatCompo =()=>{
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [pending,setPending] = useState(false);






    function formatTextWithLineBreaks(text) {
        return text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ));
      }
    
    const handleSend = async () => {
        if (input.trim()) {
          const newMessage = { sender: "user", text: input };
          setMessages([...messages, newMessage]);
          setInput("");
          setPending(true);
      
          try {
             const response = await fetch(`http://localhost:8080/ai/generate?message=${input}`, {
              method: "GET",
            });
      
            
            
            const data = await response.json();
            const forma = data.generation.replace(/<\/?think>/g, "").trim();
            const formated =formatTextWithLineBreaks(forma);
             console.log(data.generation);
            
            setMessages((prev) => [...prev, { sender: "bot", text:formated}]);
          } catch (error) {
            console.error("Error fetching response:", error);
          }finally{
            setPending(false);
          }
        }
      };
      

      
    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
            <h3 className="text-white text-3xl p-5">Ask Our Chat AI To Answer you Quetion :)</h3>
          <div className="w-full max-w-[85%] bg-gray-950 shadow-xl rounded-2xl flex flex-col">
            <div className="flex-1 min-h-[40%] overflow-y-auto p-4 space-y-4">
                
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.sender === "user"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg bg-gray-800 text-white shadow ${{
                      user: "bg-blue-500",
                      bot: "bg-gray-500",
                    }[msg.sender]}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 ">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-lg shadow focus:outline-none"
                  placeholder="Type your message... or press / to write"
                  
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                />
                  {pending ? <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"><div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div></button>: <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                  onClick={handleSend}
                >
                  Send
                </button> }
                
              </div>
            </div>
          </div>
        </div>
      );
};

export default ChatCompo;