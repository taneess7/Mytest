document.addEventListener("DOMContentLoaded", function () {
  const correctAnswers = {
    q1: "A",
    q2: "B",
    q3: "B",
    q4: "C",
    q5: "D",
    q6: "B",
    q7: "B",
    q8: "A",
    q9: "B",
    q10: "B",
    q11: "B",
    q12: "C",
    q13: "D",
    q14: "B",
    q15: "B",
    q16: "C",
    q17: "C",
    q18: "A",
    q19: "B",
    q20: "B",
    q21: ["A", "B", "C", "D"],
    q22: ["A", "B", "C"],
    q23: ["A", "B", "C"],
    q24: ["A", "B", "C"],
    q25: ["A", "B", "C"],
    q26: ["A", "B", "C", "D"],
    q27: ["A", "B"],
    q28: ["A", "B", "D"],
    q29: ["A", "B", "C"],
    q30: ["A", "B", "C"]
  };

  const explanations = {
    q1: "敏捷開發初期工作包含產品需求蒐集。",
    q2: "敏捷開發強調團隊互動與合作。",
    q3: "Acceptance Criteria 用來判斷 User Story 是否達標。",
    q4: "3C 的 Confirmation 代表確認。",
    q5: "Kano模型只有基本型、期望型、魅力型，沒有創新型。",
    q6: "Planning Poker 是敏捷估算故事點最常用的工具。",
    q7: "故事點是敏捷估算最常見的單位。",
    q8: "Release Planning 主要有 Date-Driven 與 Feature-Driven。",
    q9: "Activity Diagram 的 decision node 用菱形表示。",
    q10: "ER 模型的 ER 是 Entity Relationship。",
    q11: "多對多關係需轉換為中介實體並建立兩個一對多。",
    q12: "瀑布模式讓使用者能早期操作系統並非其缺點。",
    q13: "初期錯誤會導致連鎖反應是瀑布模式的缺點，不是漸增模式的。",
    q14: "Incremental 是將專案分割成多個小專案逐步完成。",
    q15: "Iteration 是持續重複分析、設計、製作、測試。",
    q16: "產品價格不是 User Role 屬性。",
    q17: "Release Planning 不包含決定產品價格。",
    q18: "資料庫設計第一步是需求的搜集與分析。",
    q19: "一對多關係應在「多」的一方設FK連到「一」的PK。",
    q20: "正規化主要目的是維持資料正確性與一致性。",
    q21: "敏捷開發價值觀包含個人與互動、可用軟體、與客戶合作、回應變化。",
    q22: "Acceptance Criteria 用來描述細節、設定完成標準，且由客戶撰寫。",
    q23: "3C 分別是 Card、Conversation、Confirmation。",
    q24: "Kano模型需求類型為基本型、期望型、魅力型。",
    q25: "Release Planning 主要工作有決定滿足條件、估算故事大小、決定迭代長度。",
    q26: "資料庫設計步驟包含需求搜集、概想設計、模型轉換、實際設計。",
    q27: "一對多關係需將「一」表格PK複製到「多」表格並設為FK。",
    q28: "正規化目的是維持資料正確、減少異常、確保一致性。",
    q29: "三大原則：改變世界、客戶成功公司才成功、最小化產出最大化成果。",
    q30: "User Story 標準格式包含 Who、What、Why。"
  };

  const quizForm = document.getElementById("quiz-form");
  const resultsContainer = document.getElementById("results");
  const scoreElement = document.getElementById("score");
  const percentageElement = document.getElementById("percentage");
  const detailedResultsElement = document.getElementById("detailed-results");
  const retryButton = document.getElementById("retry-btn");

  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();
    quizForm.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });

    let score = 0;
    let detailedHTML = "";

    for (let questionId in correctAnswers) {
      const correctAnswer = correctAnswers[questionId];
      let userAnswer;
      let isCorrect = false;
      const questionElement = document.getElementById(questionId);
      const questionTitle = questionElement.querySelector("h3").textContent;
      const options = Array.from(questionElement.querySelectorAll(".option"));

      // 單選題
      if (typeof correctAnswer === "string") {
        const selectedOption = document.querySelector(
          `input[name="${questionId}"]:checked`
        );
        userAnswer = selectedOption ? selectedOption.value : "未作答";
        isCorrect = userAnswer === correctAnswer;
        let optionsHTML = '<div class="all-options">';
        options.forEach((option) => {
          const input = option.querySelector("input");
          const optionValue = input.value;
          const optionText = option.textContent.trim();
          const isUserSelected = userAnswer === optionValue;
          const isCorrectOption = correctAnswer === optionValue;
          optionsHTML += `
            <div class="option-result ${isUserSelected ? "user-selected" : ""} ${isCorrectOption ? "correct-option" : ""}">
              <span class="option-value">${optionText}</span>
              ${isUserSelected ? '<span class="user-mark">✓ 您的選擇</span>' : ""}
              ${isCorrectOption ? '<span class="correct-mark">✓ 正確答案</span>' : ""}
            </div>
          `;
        });
        optionsHTML += "</div>";
        detailedHTML += `
          <div class="result-item ${isCorrect ? "correct" : "incorrect"}">
            <div class="question-text">${questionTitle}</div>
            ${optionsHTML}
            <div class="answer-explanation">${explanations[questionId] || ""}</div>
          </div>
        `;
      }
      // 多選題
      else {
        const checkboxes = document.querySelectorAll(
          `input[name="${questionId}"]:checked`
        );
        userAnswer = Array.from(checkboxes).map((checkbox) => checkbox.value);
        isCorrect =
          userAnswer.length === correctAnswer.length &&
          correctAnswer.every((answer) => userAnswer.includes(answer));
        let optionsHTML = '<div class="all-options">';
        options.forEach((option) => {
          const input = option.querySelector("input");
          const optionValue = input.value;
          const optionText = option.textContent.trim();
          const isUserSelected = userAnswer.includes(optionValue);
          const isCorrectOption = correctAnswer.includes(optionValue);
          optionsHTML += `
            <div class="option-result ${isUserSelected ? "user-selected" : ""} ${isCorrectOption ? "correct-option" : ""}">
              <span class="option-value">${optionText}</span>
              ${isUserSelected ? '<span class="user-mark">✓ 您的選擇</span>' : ""}
              ${isCorrectOption ? '<span class="correct-mark">✓ 正確答案</span>' : ""}
            </div>
          `;
        });
        optionsHTML += "</div>";
        detailedHTML += `
          <div class="result-item ${isCorrect ? "correct" : "incorrect"}">
            <div class="question-text">${questionTitle}</div>
            ${optionsHTML}
            <div class="answer-explanation">${explanations[questionId] || ""}</div>
          </div>
        `;
      }
      if (isCorrect) score++;
    }

    const totalQuestions = Object.keys(correctAnswers).length;
    scoreElement.textContent = score;
    percentageElement.textContent = Math.round((score / totalQuestions) * 100) + "%";
    detailedResultsElement.innerHTML = detailedHTML;
  });

  retryButton.addEventListener("click", function () {
    resultsContainer.classList.add("hidden");
    quizForm.classList.remove("hidden");
    quizForm.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
