document.addEventListener("DOMContentLoaded", function () {
  // 定義正確答案
  const correctAnswers = {
    // 單選題答案
    q1: "B",
    q2: "B",
    q3: "A",
    q4: "C",
    q5: "B",
    q6: "C",
    q7: "C",
    q8: "C",
    q9: "A",
    q10: "C",
    q11: "A",
    q12: "A",
    // 多選題答案 (數組形式)
    q13: ["A", "B", "C"],
    q14: ["A", "B", "C", "D"],
    q15: ["A", "B", "C", "E"],
    q16: ["A", "B", "C", "D", "E"],
    q17: ["A", "B", "C", "D", "E"],
    q18: ["A", "B", "C"],
    q19: ["A", "B", "C", "D"],
    q20: ["A", "B", "C", "D"],
  };

  // 題目解析
  const explanations = {
    q1: "javax.sql套件是在JDBC 2.0中作為標準擴展API引入的，提供了進階資料庫存取功能，包括DataSource介面、連接池和分散式事務支持。這個套件在後來的Java版本中成為Java SE的標準部分。",

    q2: "Connection介面代表與特定資料庫的連接會話，主要用於管理資料庫連接和交易。它提供了建立Statement、PreparedStatement和CallableStatement的方法，以及管理交易的方法如commit()和rollback()等。",

    q3: "在JDBC中，若未指定ResultSet的類型和並發參數，預設值為TYPE_FORWARD_ONLY（只能向前移動）和CONCUR_READ_ONLY（唯讀）。這是最基本的ResultSet配置，也是效能最佳的組合。",

    q4: "ACID特性包括原子性(Atomicity)、一致性(Consistency)、隔離行為(Isolation behavior)和持久性(Durability)。Integrity（完整性）雖然是資料庫的重要概念，但不是ACID特性的一部分。",

    q5: "交易的隔離行為指在多用戶環境中進行交易時，除了使用同個連線物件完成之外，連線物件不可與其他使用者共用，以確保交易的隔離性和一致性。",

    q6: "Type 4驅動程式（直接網路驅動程式）是完全使用Java編寫，直接將JDBC呼叫轉換為資料庫特定的網路協議，不需要任何中介軟體或原生代碼。這是最常用的JDBC驅動類型，通常提供最佳性能。",

    q7: "ResultSet提供多種getXXX()方法用於獲取結果集中的數據，如getString()用於獲取字串型別的資料，getInt()用於獲取整數型別的資料等。這些方法可以通過列索引或列名稱來存取數據。",

    q8: "PreparedStatement相較於Statement的主要優勢是可以防止SQL注入攻擊。它使用參數化查詢，將使用者輸入作為參數而非直接拼接到SQL語句中，同時也有性能上的優勢，因為SQL語句只需編譯一次。",

    q9: "批次更新（Batch Update）的主要優點是顯著提高多個更新操作的執行效率。通過將多個SQL語句收集起來一次性發送到資料庫執行，減少了網路往返次數，提高了整體性能。",

    q10: "executeQuery()方法不屬於Connection介面，而是屬於Statement介面，用於執行查詢操作。Connection介面的主要方法包括createStatement()、prepareStatement()、prepareCall()、commit()、rollback()等。",

    q11: "DatabaseMetaData用於獲取資料庫的相關信息，包括資料庫產品名稱、版本、支援的功能、表結構等。這些信息對於編寫跨資料庫的應用程式特別有用。",

    q12: "DataSource相較於DriverManager的主要優點是支援連接池功能。連接池可以重複使用已建立的資料庫連接，減少連接建立和關閉的開銷，特別是在高併發環境中表現更佳。此外，DataSource還支援分散式事務和JNDI註冊。",

    q13: "ResultSet的類型參數包括TYPE_FORWARD_ONLY（結果集只能向前移動，這是預設類型）、TYPE_SCROLL_INSENSITIVE（結果集可以向前或向後移動，但不反映資料庫中數據的更改）和TYPE_SCROLL_SENSITIVE（結果集可以向前或向後移動，且反映資料庫中的數據更改）。TYPE_RANDOM_ACCESS和TYPE_BIDIRECTIONAL不是標準的ResultSet類型。",

    q14: "ACID特性包括Atomicity（原子性）：事務中的所有操作要麼全部完成，要麼全部不完成；Consistency（一致性）：事務必須保持資料庫從一個一致狀態到另一個一致狀態；Isolation behavior（隔離行為）：並發事務之間相互隔離，互不影響；以及Durability（持久性）：一旦事務提交，其結果應該是永久的，即使系統故障。Security（安全性）不是ACID特性的一部分。",

    q15: "關於批次更新(Batch Update)：使用addBatch()方法將SQL語句添加到批次中；使用executeBatch()方法執行整個批次處理；批次更新可以顯著提高多個更新操作的效能，減少網路往返；批次更新適用於各種SQL操作，不僅限於INSERT語句，還包括UPDATE和DELETE語句；如果批次執行出現問題，會拋出BatchUpdateException，提供已執行成功的語句資訊。",

    q16: "JDBC中定義的交易隔離級別包括TRANSACTION_NONE（不支援事務隔離）、TRANSACTION_READ_COMMITTED（只能讀取已提交的資料）、TRANSACTION_READ_UNCOMMITTED（可以讀取未提交的資料）、TRANSACTION_REPEATABLE_READ（確保同一事務中多次讀取的資料一致）和TRANSACTION_SERIALIZABLE（完全隔離，事務序列化執行）。這些隔離級別用於控制事務間的互相影響程度。",

    q17: "關於ResultSet的concurrency參數：CONCUR_READ_ONLY表示結果集是唯讀的，不能修改資料；CONCUR_UPDATABLE允許透過ResultSet介面方法直接修改資料庫資料；使用CONCUR_UPDATABLE時，可以呼叫updateRow()更新當前行；使用CONCUR_UPDATABLE時，可以呼叫deleteRow()刪除當前行；使用CONCUR_UPDATABLE時，可以呼叫insertRow()插入新行。",

    q18: "JDBC提供以下類型處理大型數據：BLOB（Binary Large Object）用於處理大型二進制數據，如圖像、音訊檔案等；CLOB（Character Large Object）用於處理大型文字資料；NCLOB（National Character Large Object）用於處理國際化字元集的大型文字資料。ARRAY和XML雖然是JDBC支援的資料類型，但主要不是為處理大型數據而設計的。",

    q19: "關於JDBC中的Metadata：DatabaseMetaData提供有關資料庫的資訊，如產品名稱、版本、支援功能等；ResultSetMetaData提供有關結果集結構的資訊，如列數、列名、列型別等；可以使用DatabaseMetaData獲取資料庫支援的功能，如是否支援批次更新；可以使用ResultSetMetaData獲取結果集中列的數量、名稱和類型等資訊。Metadata資訊是可變的，會隨著資料庫結構或查詢結果的變化而變化。",

    q20: "JDBC驅動程式的類型包括Type 1 Driver（使用JDBC-ODBC橋接器連接資料庫）、Type 2 Driver（部分使用Java、部分使用原生代碼的驅動程式）、Type 3 Driver（純Java實現，通過中間層協議連接資料庫）和Type 4 Driver（純Java實現，直接轉換為資料庫網路協議的驅動程式）。JDBC規範中沒有定義Type 5驅動程式，這不是標準的JDBC驅動類型。",
  };

  // 選取DOM元素
  const quizForm = document.getElementById("quiz-form");
  const resultsContainer = document.getElementById("results");
  const scoreElement = document.getElementById("score");
  const percentageElement = document.getElementById("percentage");
  const detailedResultsElement = document.getElementById("detailed-results");
  const retryButton = document.getElementById("retry-btn");

  // 提交表單處理
  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 隱藏表單，顯示結果
    quizForm.classList.add("hidden");
    resultsContainer.classList.remove("hidden");

    // 計算分數
    let score = 0;
    let detailedHTML = "";

    // 處理每一道題目
    for (let questionId in correctAnswers) {
      const correctAnswer = correctAnswers[questionId];
      let userAnswer;
      let isCorrect = false;

      // 處理單選題
      if (typeof correctAnswer === "string") {
        userAnswer =
          document.querySelector(`input[name="${questionId}"]:checked`)
            ?.value || "未作答";
        isCorrect = userAnswer === correctAnswer;
      }
      // 處理多選題
      else {
        const checkboxes = document.querySelectorAll(
          `input[name="${questionId}"]:checked`
        );
        userAnswer = Array.from(checkboxes).map((checkbox) => checkbox.value);

        // 檢查用戶答案是否與正確答案完全一致（數量相同且包含相同元素）
        isCorrect =
          userAnswer.length === correctAnswer.length &&
          correctAnswer.every((answer) => userAnswer.includes(answer));

        // 將用戶答案轉換為字串，方便顯示
        userAnswer = userAnswer.length > 0 ? userAnswer.join(", ") : "未作答";
      }

      // 如果答對了，加分
      if (isCorrect) score++;

      // 生成這道題的詳細結果HTML
      detailedHTML += `
                <div class="result-item ${isCorrect ? "correct" : "incorrect"}">
                    <div class="question-text">問題 ${questionId.substring(
                      1
                    )}</div>
                    <div class="correct-answer">正確答案: ${
                      Array.isArray(correctAnswer)
                        ? correctAnswer.join(", ")
                        : correctAnswer
                    }</div>
                    <div class="user-answer ${
                      isCorrect ? "" : "wrong"
                    }">您的答案: ${userAnswer}</div>
                    <div class="answer-explanation">${
                      explanations[questionId] || ""
                    }</div>
                </div>
            `;
    }

    // 更新總分和百分比
    const totalQuestions = Object.keys(correctAnswers).length;
    scoreElement.textContent = score;
    percentageElement.textContent =
      Math.round((score / totalQuestions) * 100) + "%";

    // 顯示詳細結果
    detailedResultsElement.innerHTML = detailedHTML;
  });

  // 重試按鈕處理
  retryButton.addEventListener("click", function () {
    // 隱藏結果，顯示表單
    resultsContainer.classList.add("hidden");
    quizForm.classList.remove("hidden");

    // 重置所有表單元素
    quizForm.reset();
  });
});
