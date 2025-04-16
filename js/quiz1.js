document.addEventListener('DOMContentLoaded', function() {
    // 定義正確答案
    const correctAnswers = {
        // 單選題答案
        q1: 'B',
        q2: 'B',
        q3: 'D',
        q4: 'B',
        q5: 'C',
        q6: 'C',
        q7: 'B',
        q8: 'B',
        q9: 'B',
        q10: 'A',
        q11: 'B',
        q12: 'B',
        q13: 'C',
        q14: 'B',
        q15: 'A',
        // 多選題答案 (數組形式)
        q16: ['A', 'B', 'C', 'D'],
        q17: ['A', 'B', 'C', 'D', 'E'],
        q18: ['A', 'B', 'C'],
        q19: ['A', 'B', 'D'],
        q20: ['A', 'B', 'C', 'D']
    };
    
    // 題目解析
    const explanations = {
        q1: 'JDBC API是Java標準庫的一部分，專門設計用於連接Java應用程式與各種關聯式資料庫系統。它提供一個標準化的介面，讓開發者能夠使用Java編寫跨資料庫平台的程式。JDBC提供的功能包括建立連接、發送SQL查詢、處理結果集和事務管理等。它實現了"寫一次，到處執行"的理念，通過不同資料庫的驅動程式實現，使得同樣的程式碼可以操作不同的資料庫系統。',
        
        q2: 'DriverManager是JDBC架構中的核心元件，負責管理JDBC驅動程式並提供連接服務。它的主要功能包括：管理和註冊JDBC驅動程式、根據提供的URL選擇合適的驅動程式、建立與資料庫的實際連接、提供getConnection()方法接受URL、使用者名稱和密碼等參數。在Java 8之前需要手動載入驅動程式(Class.forName())，之後版本能自動發現驅動程式。',
        
        q3: 'Type 4驅動程式(Native Protocol Driver)是完全以Java語言實現的驅動程式，能直接將JDBC呼叫轉換為資料庫專用的網路協議。它的特點包括：純Java實現，不需任何本地代碼、直接與資料庫伺服器通訊，無需中間層、效能通常最佳，延遲最低、可移植性強，只需包含驅動程式JAR檔。廣泛應用的例子包括MySQL Connector/J、Oracle JDBC Thin Driver等。',
        
        q4: '在JDBC中，Connection物件是通過DriverManager類的靜態方法getConnection()獲得的。這個過程包括：載入JDBC驅動程式(較新版本Java可自動發現)、呼叫DriverManager.getConnection(url, username, password)、方法會根據URL選擇適當的驅動程式並建立連接、返回的Connection物件代表與資料庫的活動連線。',
        
        q5: 'Statement執行速度通常比PreparedStatement快的說法是錯誤的。實際上，PreparedStatement通常效能更好，特別是執行重複類似SQL語句時，因為：PreparedStatement預編譯SQL語句，產生查詢計劃並進行快取、減少每次執行時的解析和編譯開銷、資料庫可以重用執行計劃，而Statement每次執行都需重新編譯、在高併發環境中，PreparedStatement的效能優勢更加明顯、同時還能防止SQL注入攻擊，大幅提高安全性。',
        
        q6: 'PreparedStatement的主要優勢在於預編譯SQL語句，這帶來兩個核心好處：1. 效能提升：SQL語句只需編譯一次，之後可重複使用執行計劃、減少網路傳輸量(只傳遞參數而非完整SQL)、資料庫可以快取查詢計劃；2. 防止SQL注入攻擊：使用參數化查詢處理使用者輸入、參數值被視為純數據，不會被解釋為SQL代碼、即使輸入含惡意字串如 \'OR \'1\'=\'1，也不會影響SQL邏輯。',
        
        q7: '在JDBC中，executeQuery()方法專門用於執行會返回結果集的SQL查詢。這個方法：主要用於執行SELECT語句、返回ResultSet物件，包含查詢結果、只能用於查詢操作，不適用於更新操作(INSERT、UPDATE、DELETE)、如果用於執行更新操作，會拋出SQLException。相比之下，executeUpdate()用於執行不返回結果集的SQL操作(如INSERT、UPDATE、DELETE)，而execute()可用於可能返回多個結果的SQL語句。',
        
        q8: 'CallableStatement是JDBC的一個特殊介面，專門設計用於呼叫資料庫中的預存程序。它的特點包括：繼承自PreparedStatement，保留了預編譯和參數化查詢的優勢、提供特殊語法呼叫預存程序：{call procedure_name(?, ?, ...)}、支援三種參數類型：輸入(IN)、輸出(OUT)和輸入/輸出(INOUT)、提供registerOutParameter()方法註冊輸出參數、提供各種getXXX()方法獲取輸出參數值。',
        
        q9: 'CONCUR_UPDATABLE是ResultSet的並發性參數，表示結果集可以被更新。具體來說：允許透過ResultSet介面直接修改底層資料庫數據、提供多種更新方法：updateXXX()方法：更新當前行特定列的值、updateRow()：將更新寫入資料庫、deleteRow()：刪除當前行、insertRow()：插入新行、需要額外的資料庫支援和資源、通常需要查詢包含主鍵並只從單一表選擇數據。',
        
        q10: '若未指定ResultSet參數，JDBC會使用TYPE_FORWARD_ONLY和CONCUR_READ_ONLY作為預設值。這意味著：結果集只能向前移動(只能使用next()方法)、結果集是唯讀的(不能修改)、這是最基本且效能最好的組合、適合大多數只需讀取資料的應用場景、內存占用最少，處理大量數據時特別適合。',
        
        q11: '批次更新(Batch Update)的主要目的是提高多個更新操作的效能。其工作原理是：將多個SQL操作(通常是INSERT、UPDATE或DELETE)收集起來、一次性發送到資料庫執行，而非逐條發送、大幅減少客戶端和資料庫之間的網路往返次數、允許資料庫引擎優化批量操作執行。批次更新特別適合大量資料操作場景，如資料導入、大批量記錄更新等。JDBC提供addBatch()和executeBatch()方法實現這一功能。',
        
        q12: 'ORM(Object-Relational Mapping)的主要目的是將關聯式資料庫的表映射到物件導向程式的類。ORM解決了關聯式資料庫和物件導向程式設計之間的"阻抗不匹配"問題，具體功能包括：自動將資料庫表映射到Java類(表→類，列→屬性)、處理基本CRUD(建立、讀取、更新、刪除)操作、管理關聯關係(一對一、一對多、多對多)、提供查詢API，避免手寫SQL、提高開發效率，減少樣板代碼。',
        
        q13: 'DAO(Data Access Object)模式的主要職責是封裝資料存取和操作的細節。DAO作為應用程式與資料庫之間的抽象層，具體職責包括：提供CRUD操作的統一方法、管理資料庫連接、轉換應用程式的資料結構和資料庫資料結構、隱藏資料來源的具體實現細節、提供一致的API接口，使業務邏輯與資料存取邏輯分離、增強程式的可測試性和可維護性。',
        
        q14: '連接池(Connection Pool)的主要優勢是減少建立和關閉資料庫連接的開銷。資料庫連接建立過程涉及：網路連接建立、資料庫伺服器驗證、資源分配、協議初始化。連接池預先建立連接並重複使用，顯著降低這些開銷。其他優勢包括：控制並發連接數、定期驗證連接有效性、自動關閉閒置連接、連接請求排隊機制、可根據負載動態調整池大小。',
        
        q15: 'DataSource介面是JDBC 2.0引入的擴展API，比DriverManager提供更多進階功能，主要優點是支援連接池和分散式事務。具體優勢包括：連接池支援：重用連接而非每次創建、分散式事務：支援XA事務，允許跨多個資料庫的事務操作、命名服務整合：可通過JNDI註冊和查找、更佳配置性：連接參數可在伺服器端設定，不需硬編碼、增強安全性：資料庫憑證可由容器管理。',
        
        q16: 'JDBC規範定義了四種驅動程式類型：Type 1 (JDBC-ODBC Bridge)：透過ODBC橋接器連接資料庫，需安裝ODBC驅動和設定資料來源、Type 2 (Native API)：部分Java實現，部分使用原生程式碼，需安裝特定平台的客戶端程式庫、Type 3 (Network Protocol)：純Java實現，透過中間層伺服器將JDBC呼叫轉換為資料庫協議、Type 4 (Native Protocol)：純Java實現，直接將JDBC呼叫轉換為資料庫網路協議，不需中間層。JDBC規範中沒有Type 5類型，這是個不存在的分類。',
        
        q17: 'ResultSet提供多種導航方法，功能各異：next()：移至下一行，所有ResultSet類型都支援、previous()：移至前一行，僅可滾動ResultSet支援、first()：移至第一行，僅可滾動ResultSet支援、last()：移至最後一行，僅可滾動ResultSet支援、absolute(int)：移至指定行，僅可滾動ResultSet支援。需注意，除了next()外，其他導航方法僅在TYPE_SCROLL_INSENSITIVE或TYPE_SCROLL_SENSITIVE類型的ResultSet中可用。',
        
        q18: 'ResultSet的類型參數只有三種標準選項：TYPE_FORWARD_ONLY：僅能向前移動，是預設類型，效能最佳、TYPE_SCROLL_INSENSITIVE：可前後滾動，但不反映資料庫修改、TYPE_SCROLL_SENSITIVE：可前後滾動，且反映資料庫修改。TYPE_RANDOM_ACCESS和TYPE_BIDIRECTIONAL不是JDBC標準定義的ResultSet類型，這些是不存在的參數。',
        
        q19: 'JDBC提供三種主要的元數據介面：DatabaseMetaData：提供資料庫整體資訊，如產品名稱、版本、功能支援、表結構等、ResultSetMetaData：提供結果集結構資訊，如列數、列名、資料類型等、ParameterMetaData：提供PreparedStatement參數資訊，如參數數量、類型等。ConnectionMetaData和DriverMetaData不是JDBC標準API的一部分，這些介面不存在。',
        
        q20: '資料庫事務的ACID特性是確保資料完整性和一致性的基本原則：Atomicity (原子性)：事務中的所有操作要麼全部成功，要麼全部失敗、Consistency (一致性)：事務必須保持資料庫從一個一致狀態到另一個一致狀態、Isolation (隔離性)：並發事務之間相互隔離，互不影響、Durability (持久性)：一旦事務提交，其結果必須是永久的，即使系統故障。Security (安全性)不是ACID特性的一部分，雖然安全性對資料庫系統很重要，但它屬於單獨的功能範疇。'
    };
    
    // 選取DOM元素
    const quizForm = document.getElementById('quiz-form');
    const resultsContainer = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const percentageElement = document.getElementById('percentage');
    const detailedResultsElement = document.getElementById('detailed-results');
    const retryButton = document.getElementById('retry-btn');
    
    // 提交表單處理
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 隱藏表單，顯示結果
        quizForm.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        // 計算分數
        let score = 0;
        let detailedHTML = '';
        
        // 處理每一道題目
        for (let questionId in correctAnswers) {
            const correctAnswer = correctAnswers[questionId];
            let userAnswer;
            let isCorrect = false;
            
            // 處理單選題
            if (typeof correctAnswer === 'string') {
                userAnswer = document.querySelector(`input[name="${questionId}"]:checked`)?.value || '未作答';
                isCorrect = userAnswer === correctAnswer;
            } 
            // 處理多選題
            else {
                const checkboxes = document.querySelectorAll(`input[name="${questionId}"]:checked`);
                userAnswer = Array.from(checkboxes).map(checkbox => checkbox.value);
                
                // 檢查用戶答案是否與正確答案完全一致（數量相同且包含相同元素）
                isCorrect = userAnswer.length === correctAnswer.length && 
                            correctAnswer.every(answer => userAnswer.includes(answer));
                
                // 將用戶答案轉換為字串，方便顯示
                userAnswer = userAnswer.length > 0 ? userAnswer.join(', ') : '未作答';
            }
            
            // 如果答對了，加分
            if (isCorrect) score++;
            
            // 生成這道題的詳細結果HTML
            detailedHTML += `
                <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="question-text">問題 ${questionId.substring(1)}</div>
                    <div class="correct-answer">正確答案: ${Array.isArray(correctAnswer) ? correctAnswer.join(', ') : correctAnswer}</div>
                    <div class="user-answer ${isCorrect ? '' : 'wrong'}">您的答案: ${userAnswer}</div>
                    <div class="answer-explanation">${explanations[questionId] || ''}</div>
                </div>
            `;
        }
        
        // 更新總分和百分比
        const totalQuestions = Object.keys(correctAnswers).length;
        scoreElement.textContent = score;
        percentageElement.textContent = Math.round((score / totalQuestions) * 100) + '%';
        
        // 顯示詳細結果
        detailedResultsElement.innerHTML = detailedHTML;
    });
    
    // 重試按鈕處理
    retryButton.addEventListener('click', function() {
        // 隱藏結果，顯示表單
        resultsContainer.classList.add('hidden');
        quizForm.classList.remove('hidden');
        
        // 重置所有表單元素
        quizForm.reset();
    });
});
