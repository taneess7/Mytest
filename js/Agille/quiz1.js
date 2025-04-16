document.addEventListener("DOMContentLoaded", function () {
  // 定義正確答案
  const correctAnswers = {
    // 單選題答案
    q1: "A",
    q2: "D",
    q3: "D",
    q4: "C",
    q5: "C",
    q6: "D",
    q7: "B",
    q8: "A",
    q9: "C",
    q10: "C",
    q11: "B",
    q12: "C",
    q13: "B",
    q14: "D",
    q15: "C",
    // 多選題答案 (數組形式)
    q16: ["A", "B", "C"],
    q17: ["A", "B", "C"],
    q18: ["A", "B", "C"],
    q19: ["A", "B", "C"],
    q20: ["A", "B", "C"],
    q21: ["A", "B", "C"],
    q22: ["A", "B", "C", "D"],
    q23: ["A", "B", "C", "D"],
    q24: ["A", "B", "C"],
    q25: ["A", "C"]
  };

  // 題目解析
  const explanations = {
    q1: 'ER Model(實體關係模型)是由Peter Chen在1976年提出的資料模型，是一種用於描述資料庫概念結構的圖形方法，用來表達實體(Entity)和關係(Relationship)，以及它們的屬性(Attribute)。ER模型可以幫助我們理解和設計資料庫結構，在系統分析與設計階段很有用處。它提供了一種視覺化的方式來表示資料之間的關聯，使得資料庫設計更加直觀且系統化。',

    q2: "在ER Model(實體關係模型)中，常見的基數表示法(Cardinality)包括一對一(1:1)、一對多(1:N)和多對多(M:N)，這些用來表示實體之間的數量關係。「零對零(0:0)」不是ER模型中的標準基數表示法。基數是描述一個實體的一個實例可以與另一個實體的幾個實例相關聯的指標，常用於表示業務規則和約束條件，如一個部門可以有多名員工(1:N)，一名學生可以選修多門課程而一門課程也可以被多名學生選修(M:N)等。",

    q3: "標準的資料庫正規化階段通常包括第一正規化(1NF)、第二正規化(2NF)、第三正規化(3NF)和Boyce-Codd正規化(BCNF)。第五正規化(5NF)不屬於常見的標準正規化階段，它處理的是多值相依性問題，通常只在特殊情況下才需要考慮。正規化的主要目的是減少資料重複、避免資料異常(如插入、刪除和更新異常)，並提高資料的一致性。不同階段的正規化處理不同類型的資料相依性問題。",

    q4: "在關聯式資料庫中，NULL是一個特殊的標記，代表「未知」或「無值」的情況，它不等同於數值0、空字串('')或布林值False。NULL表示該欄位的值目前不存在或未知，這與已知的空值或0是有區別的。處理NULL值需要特殊的運算符如IS NULL或IS NOT NULL，因為NULL與任何值(包括另一個NULL)做比較都不會返回真。理解NULL的特性對於正確設計資料庫和編寫查詢非常重要。",

    q5: "關於主鍵(Primary Key)的特性，一個資料表只能有一個主鍵。主鍵可以是單一欄位，也可以是由多個欄位組成的複合主鍵。主鍵的值在整個資料表中必須是唯一的，而且不能包含NULL值。主鍵的主要功能是唯一識別資料表中的每一筆資料，並作為資料表間關聯的基礎。雖然一個資料表只能有一個主鍵，但可以有多個候選鍵(Candidate Key)，其中一個被選為主鍵，其餘則成為替代鍵(Alternate Key)。",

    q6: "CAP理論是分布式系統的一個重要理論，由Eric Brewer提出，用來描述分布式系統只能同時滿足一致性(Consistency)、可用性(Availability)和分區容忍性(Partition tolerance)中的兩項。Performance(效能)不是CAP理論的一部分。一致性指的是所有節點在同一時間看到的數據是否一致；可用性指的是系統是否能繼續提供服務；分區容忍性指的是系統在網絡分區或通信中斷時是否能正常運作。不同的NoSQL資料庫會在這三者之間做出不同的取捨。",

    q7: "NoSQL資料庫的主要類型包括鍵值資料庫(Key-Value Database)、文檔導向資料庫(Document-Oriented Database)、列導向資料庫(Column-Oriented Database)和圖形資料庫(Graph Database)。SQL Database是傳統的關聯式資料庫類型，不屬於NoSQL資料庫。NoSQL專注於處理非結構化或半結構化的資料，提供高擴展性和靈活性，而關聯式資料庫則專注於結構化資料和ACID事務保證。每種NoSQL類型都有其特定的用途和優勢。",

    q8: "Redis是一種鍵值資料庫(Key-Value Database)，它將資料以鍵值對的形式存儲在記憶體中，提供高性能的讀寫操作。Redis支援多種資料結構，如字串(Strings)、列表(Lists)、集合(Sets)、有序集合(Sorted Sets)和雜湊(Hashes)等，這使得它比一般的鍵值資料庫更靈活。Redis的主要特點包括：所有資料都保存在記憶體中、可持久化到磁碟、支援主從複製、提供豐富的資料結構，廣泛應用於快取、會話管理、即時分析等場景。",

    q9: "分片(Sharding)是一種資料庫水平分區技術，它將大型資料庫分割成更小、更易管理的部分，稱為「分片」，並將這些分片分散儲存在不同的伺服器上。與垂直分區(將資料表的欄位分到不同表中)不同，水平分區是將資料列分散到不同的伺服器上。分片的主要目的是提高系統的水平擴展能力，處理大量資料和請求。這種技術適用於關聯式資料庫和NoSQL資料庫，尤其在大規模分布式系統中廣泛使用。",

    q10: "在資料依賴性(Functional Dependency)中，當A→B且B→C時，可以推導出A→C，這就是遞移相依(Transitive Dependency)的定義。遞移相依是第三正規化(3NF)要解決的主要問題。例如，如果學號(A)決定了系所編號(B)，而系所編號(B)又決定了系所名稱(C)，則學號(A)也間接決定了系所名稱(C)，這就形成了A→C的遞移相依。識別和消除遞移相依可以減少資料更新時的異常問題。",

    q11: "NoSQL資料庫的BASE理論是對傳統關聯式資料庫ACID特性的一種放寬，主要放寬了一致性(Consistency)要求。BASE代表「基本可用(Basically Available)」、「軟狀態(Soft state)」和「最終一致性(Eventually consistent)」。相較於ACID嚴格要求即時一致性，BASE接受資料在某一時間點可能不一致，但最終會達到一致狀態。這種設計選擇使NoSQL資料庫能在分布式環境中提供更好的可用性和擴展性，特別適合處理大規模、高併發的應用場景。",

    q12: "超鍵(Super Key)是能唯一識別記錄的屬性集合，包括候選鍵、主鍵和替代鍵，但外來鍵(Foreign Key)不是超鍵的一種。外來鍵是在一個資料表中參照另一個資料表的主鍵或候選鍵的欄位，用於建立和維護資料表之間的關聯。外來鍵不能保證在所在資料表中的唯一性，因此不能作為超鍵。超鍵的關鍵特性是能夠唯一識別資料表中的每一筆記錄，而外來鍵則是確保參照完整性。",

    q13: "Master-slave複製(Replication)是一種分布式模型，主要解決讀取性能問題。在這種模型中，一個主(Master)節點負責所有的寫入操作，而多個從(Slave)節點從主節點複製資料，並處理讀取請求。這種架構的主要優勢包括：透過從節點分擔讀取請求提高系統整體讀取能力；提供資料備份，增強系統可靠性；降低主節點負載；允許從節點位於不同地理位置，減少訪問延遲。然而，它並不直接解決寫入性能問題，因為所有寫入仍然需要經過主節點。",

    q14: "大數據(Big Data)的3V特性是Volume(數據量)、Variety(多樣性)和Velocity(速度)。Visibility(可視性)不是大數據的標準3V特性。Volume指的是資料的龐大規模；Variety指的是資料類型和來源的多樣化，包括結構化、半結構化和非結構化資料；Velocity指的是資料生成和處理的速度。這些特性定義了大數據的本質，也驅動了NoSQL資料庫和分布式計算技術的發展，以應對傳統資料庫系統無法有效處理的大規模、多樣化、高速資料。",

    q15: "Redis支援多種資料結構，包括字串(Strings)、列表(Lists)、集合(Sets)、有序集合(Sorted Sets)和雜湊(Hashes)。「Tables(表格)」不是Redis支援的原生資料類型。Redis的資料結構設計使其比單純的鍵值儲存更加靈活強大，能夠實現更複雜的功能。例如，可以使用Lists實現訊息佇列，使用Sets實現標籤系統，使用Sorted Sets實現排行榜，使用Hashes儲存物件等。這些資料結構都存在記憶體中，提供極高的讀寫性能。",

    q16: "NoSQL資料庫的主要特性包括：(1)通常使用非關聯式的資料模型，如鍵值、文檔、列族或圖形等；(2)善於處理大量且結構不固定的資料，能夠靈活應對不斷變化的資料結構；(3)通常提供良好的水平擴展性，可以通過添加更多節點來擴展系統。NoSQL資料庫通常不遵循ACID原則，而是遵循BASE原則，接受一定程度的最終一致性來換取更好的可用性和分區容忍性。同時，NoSQL正是為了處理大數據應用而設計的，非常適合大規模資料處理。",

    q17: "關於主鍵(Primary Key)的正確敘述：(A)可以由多個欄位組成，稱為複合主鍵；(B)其值不能是NULL，必須有值；(C)其值在表中必須唯一不重複，這是主鍵的核心特性。但一個表格只能有一個主鍵(D選項錯誤)，雖然可以有多個候選鍵，但只有一個被指定為主鍵。主鍵的主要功能是唯一識別資料表中的每一筆記錄，並作為建立資料表關聯的基礎。",

    q18: "關於CAP理論的正確敘述：(A)一個分布式系統不可能同時滿足一致性(C)、可用性(A)和分區容忍性(P)三個特性，最多只能同時滿足其中兩個；(B)傳統關聯式資料庫通常選擇犧牲分區容忍性(P)，優先保證一致性(C)和可用性(A)；(C)Redis可以根據配置選擇CP(一致性和分區容忍性)或AP(可用性和分區容忍性)系統。NoSQL資料庫不一定總是犧牲一致性，有些NoSQL系統(如某些設定下的MongoDB)會選擇CP而非AP。",

    q19: "NoSQL資料庫的主要設計原則，也被稱為DDI原則：(A)去正規化(Denormalization)：將資料合併到單一結構中，減少查詢時的聯結操作；(B)資料重複(Duplication)：接受資料的冗餘複製，以提高查詢效率；(C)智能鍵(Intelligent Keys)：在鍵的設計中嵌入更多資訊，優化資料存取。第三正規化(3NF)是關聯式資料庫的設計原則，與NoSQL的設計理念相反。NoSQL強調「為問題而設計，而非為答案而設計」，根據應用的查詢模式來優化資料模型。",

    q20: "關於外來鍵(Foreign Key)的正確敘述：(A)外來鍵可以參照同一表格的主鍵，這被稱為自參照或自關聯；(B)外來鍵可以是NULL，除非有特別約束指定不能為NULL；(C)外來鍵的值必須是被參照表格的主鍵或候選鍵的值，這確保了參照完整性。外來鍵不一定是單一欄位(D選項錯誤)，它可以是複合的，由多個欄位組成，尤其是當被參照的是複合主鍵時。",

    q21: "關於正規化的正確敘述：(A)第一正規化(1NF)要求所有欄位值都是不可再分的單一值，消除重複群組；(B)第二正規化(2NF)要求滿足1NF並且所有非鍵屬性完全依賴於主鍵，消除部分依賴；(C)第三正規化(3NF)要求滿足2NF並且消除遞移相依，確保所有非鍵屬性直接依賴於主鍵。正規化的主要目的是減少資料重複和避免更新異常，但可能會降低查詢效能(D選項錯誤)，因為需要更多的表格聯結操作。",

    q22: "Redis支援多種資料結構，包括：(A)Strings(字串)：最基本的資料類型，可以存儲字串、整數或二進制資料；(B)Lists(列表)：有序的字串集合，適合實現佇列或堆疊；(C)Sets(集合)：無序的唯一字串集合，支援集合運算如聯集、交集等；(D)Hashes(雜湊)：欄位-值對的集合，適合表示物件。Redis還支援Sorted Sets(有序集合)，但不支援「Tables(表格)」作為原生資料類型(E選項錯誤)。",

    q23: "關於分布式資料庫模型的正確敘述：(A)Single Server模型適合小型應用，但當資料量和用戶增加時缺乏擴展性；(B)Sharding將資料水平分區到多個伺服器，提高系統的水平擴展能力；(C)Master-slave Replication通過分擔讀取請求提高整體讀取性能；(D)Peer-to-peer Replication模型中所有節點地位平等，沒有主從之分，每個節點都可以處理讀寫請求。",

    q24: "NoSQL與SQL比較的正確敘述：(A)NoSQL通常更適合處理非結構化或半結構化資料，如JSON、圖形數據等；(B)SQL資料庫通常基於ACID原則提供更強的一致性保證；(C)NoSQL資料庫通常為特定問題提供解決方案，如高併發、大數據存儲等。SQL資料庫和NoSQL資料庫的效能取決於具體使用場景(D選項錯誤)，不能一概而論哪種更好。",

    q25: "關於Quorums機制的正確敘述：(A)當讀取節點數(R)加上寫入節點數(W)大於總節點數(N)時(即R+W>N)，系統可以保證嚴格一致性，因為任何讀取操作至少會覆蓋一個具有最新寫入的節點；(C)N代表複製因子，即資料的副本數量，分佈在不同的節點上。當R+W≤N時，不一定提供最終一致性(B選項錯誤)，這取決於系統的具體設計。增加W值不會提高讀取性能(D選項錯誤)，反而會降低寫入性能，因為需要更多節點確認寫入成功。",
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
    // 將頁面滾動到頂部
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滾動效果
    });
    // 計算分數
    let score = 0;
    let detailedHTML = "";

    // 處理每一道題目
    for (let questionId in correctAnswers) {
      const correctAnswer = correctAnswers[questionId];
      let userAnswer;
      let isCorrect = false;

      // 獲取問題元素
      const questionElement = document.getElementById(questionId);
      // 獲取問題標題
      const questionTitle = questionElement.querySelector("h3").textContent;
      // 獲取所有選項
      const options = Array.from(questionElement.querySelectorAll(".option"));

      // 處理單選題
      if (typeof correctAnswer === "string") {
        const selectedOption = document.querySelector(
          `input[name="${questionId}"]:checked`
        );
        userAnswer = selectedOption ? selectedOption.value : "未作答";
        isCorrect = userAnswer === correctAnswer;

        // 生成選項HTML，標記正確答案和用戶答案
        let optionsHTML = '<div class="all-options">';
        options.forEach((option) => {
          const input = option.querySelector("input");
          const optionValue = input.value;
          const optionText = option.querySelector(".option-text").textContent;
          const isUserSelected = userAnswer === optionValue;
          const isCorrectOption = correctAnswer === optionValue;

          optionsHTML += `
                        <div class="option-result ${
                          isUserSelected ? "user-selected" : ""
                        } ${isCorrectOption ? "correct-option" : ""}">
                            <span class="option-value">${optionText}</span>
                            ${
                              isUserSelected
                                ? '<span class="user-mark">✓ 您的選擇</span>'
                                : ""
                            }
                            ${
                              isCorrectOption
                                ? '<span class="correct-mark">✓ 正確答案</span>'
                                : ""
                            }
                        </div>
                    `;
        });
        optionsHTML += "</div>";

        // 生成這道題的詳細結果HTML
        detailedHTML += `
                    <div class="result-item ${
                      isCorrect ? "correct" : "incorrect"
                    }">
                        <div class="question-text">${questionTitle}</div>
                        ${optionsHTML}
                        <div class="answer-explanation">${
                          explanations[questionId] || ""
                        }</div>
                    </div>
                `;
      }
      // 處理多選題
      else {
        const checkboxes = document.querySelectorAll(
          `input[name="${questionId}"]:checked`
        );
        userAnswer = Array.from(checkboxes).map((checkbox) => checkbox.value);

        // 檢查用戶答案是否與正確答案完全一致
        isCorrect =
          userAnswer.length === correctAnswer.length &&
          correctAnswer.every((answer) => userAnswer.includes(answer));

        // 生成選項HTML，標記正確答案和用戶答案
        let optionsHTML = '<div class="all-options">';
        options.forEach((option) => {
          const input = option.querySelector("input");
          const optionValue = input.value;
          const optionText = option.querySelector(".option-text").textContent;
          const isUserSelected = userAnswer.includes(optionValue);
          const isCorrectOption = correctAnswer.includes(optionValue);

          optionsHTML += `
                        <div class="option-result ${
                          isUserSelected ? "user-selected" : ""
                        } ${isCorrectOption ? "correct-option" : ""}">
                            <span class="option-value">${optionText}</span>
                            ${
                              isUserSelected
                                ? '<span class="user-mark">✓ 您的選擇</span>'
                                : ""
                            }
                            ${
                              isCorrectOption
                                ? '<span class="correct-mark">✓ 正確答案</span>'
                                : ""
                            }
                        </div>
                    `;
        });
        optionsHTML += "</div>";

        // 生成這道題的詳細結果HTML
        detailedHTML += `
                    <div class="result-item ${
                      isCorrect ? "correct" : "incorrect"
                    }">
                        <div class="question-text">${questionTitle}</div>
                        ${optionsHTML}
                        <div class="answer-explanation">${
                          explanations[questionId] || ""
                        }</div>
                    </div>
                `;
      }

      // 如果答對了，加分
      if (isCorrect) score++;
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
    
    // 將頁面滾動到頂部
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滾動效果
    });
  });
});
