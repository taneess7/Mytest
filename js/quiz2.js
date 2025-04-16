document.addEventListener('DOMContentLoaded', function() {
    // 定義正確答案
    const correctAnswers = {
        // 單選題答案
        q1: 'B',
        q2: 'C',
        q3: 'A',
        q4: 'B',
        q5: 'D',
        q6: 'A',
        q7: 'B',
        q8: 'B',
        q9: 'B',
        q10: 'B',
        q11: 'B',
        q12: 'B',
        // 多選題答案 (數組形式)
        q13: ['A', 'B', 'C'],
        q14: ['A', 'B'],
        q15: ['A', 'B', 'D', 'E'],
        q16: ['A', 'B', 'C', 'D', 'E'],
        q17: ['A', 'B', 'C', 'D'],
        q18: ['A', 'C'],
        q19: ['A', 'B', 'C', 'D'],
        q20: ['A', 'B', 'C', 'D', 'E']
    };
    
    // 題目解析
    const explanations = {
        q1: 'javax.sql包是在JDBC 2.0中作為標準擴展API引入的，提供了進階資料庫存取功能，包括DataSource接口、連接池和分散式事務支持。這個包在後來的Java版本中成為Java SE的標準部分。',
        
        q2: '在JDBC架構中，Connection接口代表與特定資料庫的連接會話。它提供了執行SQL語句、管理事務、獲取資料庫元數據等功能的環境。通過Connection，可以創建Statement、PreparedStatement和CallableStatement來執行SQL操作。',
        
        q3: '如果在創建Statement時未指定ResultSet類型參數，預設值為TYPE_FORWARD_ONLY，表示結果集只能向前移動，不能向後或隨機訪問記錄。',
        
        q4: 'ResultSet的CONCUR_UPDATABLE常數表示結果集是可更新的，允許通過ResultSet接口方法（如updateRow()、insertRow()和deleteRow()）直接修改基礎資料庫數據。',
        
        q5: 'Type 4: Native Protocol驅動程式是純Java實現的，它直接將JDBC調用轉換為資料庫原生網路協議，不需要任何中間層或原生庫。這種類型的驅動程式通常提供最佳性能和最大的可移植性。',
        
        q6: '在JDBC中，若未設定ResultSet的類型和並發性參數，預設組合為TYPE_FORWARD_ONLY（只能向前移動）和CONCUR_READ_ONLY（唯讀）。這是最基本的ResultSet配置，也是效能最好的一種設置。',
        
        q7: 'DataSource接口相較於DriverManager的主要優勢是支援連接池和分散式事務處理。連接池可以減少建立新連接的開銷，而分散式事務則允許在多個資料庫之間進行事務操作。此外，DataSource還便於通過JNDI進行註冊和查找。',
        
        q8: '在JDBC中，executeQuery()方法用於執行返回單一ResultSet的SELECT查詢。而executeUpdate()用於執行不返回結果集的SQL語句（如INSERT、UPDATE、DELETE），execute()方法則可用於可能返回多個結果的SQL語句。',
        
        q9: 'Redis主要是一種鍵值對型(Key-Value)的NoSQL資料庫，它將數據存儲為鍵值對，並支持多種數據類型，如字符串、列表、集合、有序集合和哈希表。Redis的所有數據都保存在內存中，提供很高的讀寫性能。',
        
        q10: '使用PreparedStatement的主要優點是提高性能並防止SQL注入攻擊。PreparedStatement通過預編譯SQL語句和參數化查詢來實現這些好處，特別是在多次執行類似SQL語句的情況下更為明顯。',
        
        q11: '資料庫連接池的主要目的是減少建立和關閉資料庫連接的開銷。連接池維護一個預先建立的資料庫連接集合，應用程序可以重複使用這些連接，而不需要每次都創建新連接，這在高並發環境中特別有用。',
        
        q12: 'CallableStatement接口主要用於調用資料庫存儲過程。它是PreparedStatement的子接口，提供了執行存儲過程的特定方法，包括對輸入、輸出和輸入/輸出參數的處理。',
        
        q13: 'ResultSet的有效類型參數只有三種：TYPE_FORWARD_ONLY（結果集只能向前移動，這是預設類型）、TYPE_SCROLL_INSENSITIVE（結果集可以向前或向後移動，但不反映資料庫中數據的更改）和TYPE_SCROLL_SENSITIVE（結果集可以向前或向後移動，且反映資料庫中的數據更改）。TYPE_RANDOM_ACCESS和TYPE_BACKWARD_ONLY不是標準的ResultSet類型。',
        
        q14: 'ResultSet的並發性參數只有兩種有效類型：CONCUR_READ_ONLY（結果集是唯讀的，不能修改）和CONCUR_UPDATABLE（結果集可以被更新，支持通過ResultSet接口進行記錄的插入、更新和刪除操作）。CONCUR_WRITABLE、CONCUR_MODIFY和CONCUR_INSERT_ONLY不是標準的ResultSet並發性參數。',
        
        q15: 'javax.sql包提供的功能包括：連接池支援（通過ConnectionPoolDataSource和PooledConnection接口實現）、分散式事務（支持跨多個資料庫的事務，通過XADataSource和XAConnection接口實現）、DataSource接口（提供獲取資料庫連接的另一種方式，比DriverManager更先進）、RowSet接口（提供一種更靈活的處理結果集的方式，包括多種實現如JdbcRowSet、CachedRowSet等）。javax.sql包中沒有「行動式代理程式」這一功能。',
        
        q16: 'ResultSet提供多種移動游標的方法：next()（將游標移到下一行，如果有下一行則返回true，否則返回false）、previous()（將游標移到上一行，僅適用於可滾動的ResultSet）、first()（將游標移到第一行，僅適用於可滾動的ResultSet）、last()（將游標移到最後一行，僅適用於可滾動的ResultSet）和absolute(int row)（將游標移到指定行，僅適用於可滾動的ResultSet）。這些方法都可以用於在結果集中移動游標，但請注意，只有TYPE_SCROLL_INSENSITIVE或TYPE_SCROLL_SENSITIVE類型的ResultSet才支持previous()、first()、last()和absolute()方法。',
        
        q17: 'JDBC定義了四種基本的驅動類型：Type 1（JDBC-ODBC Bridge驅動，通過ODBC驅動程式連接到資料庫）、Type 2（部分Java實現，部分原生代碼（如C、C++）的驅動）、Type 3（純Java實現，使用中間層協議轉換為資料庫協議的驅動）、Type 4（純Java實現，直接將JDBC調用轉換為資料庫特定網路協議的驅動）。不存在「Type 5驅動」這一分類。JDBC規範只定義了上述四種類型。',
        
        q18: '關閉Statement、PreparedStatement或CallableStatement資源的方法有：close()（顯式調用close()方法關閉資源）和try-with-resources語句（Java 7引入的語法結構，自動管理資源的關閉）。shutdown()和release()不是JDBC接口的標準方法。而finalize()雖然是Object類的方法，但不應該依賴它來關閉資源，因為垃圾收集的時間是不確定的。',
        
        q19: 'Connection接口的正確方法包括：createStatement()（創建基本的Statement對象）、prepareStatement()（創建預處理語句）、prepareCall()（創建用於調用存儲過程的CallableStatement）和setAutoCommit()（設置事務自動提交模式）。disconnect()不是Connection接口的標準方法，關閉連接應使用close()方法。',
        
        q20: '在處理大量數據時，以下技術都可以提高JDBC性能：批處理更新（通過addBatch()和executeBatch()方法一次性執行多個SQL語句）、預處理語句（使用PreparedStatement可以重用SQL語句的執行計劃）、適當的交易管理（通過合理控制事務大小和隔離級別優化性能）、連接池（減少建立和關閉連接的開銷）和適當的ResultSet類型和並發性設置（選擇最適合業務需求的設置，避免不必要的功能開銷）。所有這些技術結合使用可以顯著提高JDBC應用程序的性能。'
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
            
            // 獲取問題元素
            const questionElement = document.getElementById(questionId);
            // 獲取問題標題
            const questionTitle = questionElement.querySelector('h3').textContent;
            // 獲取所有選項
            const options = Array.from(questionElement.querySelectorAll('.option'));
            
            // 處理單選題
            if (typeof correctAnswer === 'string') {
                const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
                userAnswer = selectedOption ? selectedOption.value : '未作答';
                isCorrect = userAnswer === correctAnswer;
                
                // 生成選項HTML，標記正確答案和用戶答案
                let optionsHTML = '<div class="all-options">';
                options.forEach(option => {
                    const input = option.querySelector('input');
                    const optionValue = input.value;
                    const optionText = option.querySelector('.option-text').textContent;
                    const isUserSelected = userAnswer === optionValue;
                    const isCorrectOption = correctAnswer === optionValue;
                    
                    optionsHTML += `
                        <div class="option-result ${isUserSelected ? 'user-selected' : ''} ${isCorrectOption ? 'correct-option' : ''}">
                            <span class="option-value">${optionText}</span>
                            ${isUserSelected ? '<span class="user-mark">✓ 您的選擇</span>' : ''}
                            ${isCorrectOption ? '<span class="correct-mark">✓ 正確答案</span>' : ''}
                        </div>
                    `;
                });
                optionsHTML += '</div>';
                
                // 生成這道題的詳細結果HTML
                detailedHTML += `
                    <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                        <div class="question-text">${questionTitle}</div>
                        ${optionsHTML}
                        <div class="answer-explanation">${explanations[questionId] || ''}</div>
                    </div>
                `;
            } 
            // 處理多選題
            else {
                const checkboxes = document.querySelectorAll(`input[name="${questionId}"]:checked`);
                userAnswer = Array.from(checkboxes).map(checkbox => checkbox.value);
                
                // 檢查用戶答案是否與正確答案完全一致
                isCorrect = userAnswer.length === correctAnswer.length && 
                            correctAnswer.every(answer => userAnswer.includes(answer));
                
                // 生成選項HTML，標記正確答案和用戶答案
                let optionsHTML = '<div class="all-options">';
                options.forEach(option => {
                    const input = option.querySelector('input');
                    const optionValue = input.value;
                    const optionText = option.querySelector('.option-text').textContent;
                    const isUserSelected = userAnswer.includes(optionValue);
                    const isCorrectOption = correctAnswer.includes(optionValue);
                    
                    optionsHTML += `
                        <div class="option-result ${isUserSelected ? 'user-selected' : ''} ${isCorrectOption ? 'correct-option' : ''}">
                            <span class="option-value">${optionText}</span>
                            ${isUserSelected ? '<span class="user-mark">✓ 您的選擇</span>' : ''}
                            ${isCorrectOption ? '<span class="correct-mark">✓ 正確答案</span>' : ''}
                        </div>
                    `;
                });
                optionsHTML += '</div>';
                
                // 生成這道題的詳細結果HTML
                detailedHTML += `
                    <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                        <div class="question-text">${questionTitle}</div>
                        ${optionsHTML}
                        <div class="answer-explanation">${explanations[questionId] || ''}</div>
                    </div>
                `;
            }
            
            // 如果答對了，加分
            if (isCorrect) score++;
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
