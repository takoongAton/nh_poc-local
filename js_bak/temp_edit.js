/* allCustomSelects */
document.addEventListener('DOMContentLoaded', () => {
  const allCustomSelects = document.querySelectorAll('.custom-select');

  allCustomSelects.forEach(customSelect => {
    const nativeSelect = customSelect.querySelector('.custom-select_native');
    const selectedOption = nativeSelect.options[nativeSelect.selectedIndex];

    // ✅ 트리거 버튼 동적 생성
    const triggerBtn = document.createElement('button');
    triggerBtn.type = 'button';
    triggerBtn.className = 'custom-select_trigger';
    triggerBtn.innerHTML = `
      <span class="custom-select_label">${selectedOption.textContent}</span>
      <span class="custom-select_icon">
        <img src="../../images/ico_arrow_down.png" alt="메뉴선택 아이콘">
      </span>
    `;
    customSelect.appendChild(triggerBtn);

    // ✅ required 여부에 따라 triggerBtn 클래스 추가/삭제
    if (nativeSelect.hasAttribute('required')) {
      triggerBtn.classList.add('required');
    } else {
      triggerBtn.classList.remove('required');
    }

    // ✅ w100 여부
    if (customSelect.classList.contains('w100')) {
      triggerBtn.closest(".custom-select").classList.add('w100');
    } else {
      triggerBtn.closest(".custom-select").classList.remove('w100');
    }

    // ✅ disabled 여부 → trigger 비활성화
    if (nativeSelect.disabled) {
      triggerBtn.classList.add('disabled');
      triggerBtn.disabled = true; // HTML 속성도 함께
    }

    // ✅ 옵션 목록 동적 생성
    const optionsBox = document.createElement('ul');
    optionsBox.className = 'custom-select_options';

    Array.from(nativeSelect.options).forEach(option => {
      if (option.disabled && option.hidden) return; // 플레이스홀더는 리스트에 표시 안 함

      const li = document.createElement('li');
      li.className = 'custom-select_option';
      li.setAttribute('data-value', option.value);
      li.textContent = option.textContent;
      optionsBox.appendChild(li);
    });

    customSelect.appendChild(optionsBox);

    const labelSpan = triggerBtn.querySelector('.custom-select_label');

    // ✅ 토글 열기/닫기
    triggerBtn.addEventListener('click', (e) => {
      if (nativeSelect.disabled) return; // disabled 시 동작 안 함
      e.stopPropagation();
      const isOpen = optionsBox.classList.contains('open');
      closeAllSelects();
      if (!isOpen) {
        // 먼저 열어보기 (위치 계산을 위해)
        optionsBox.classList.add('open');
        triggerBtn.classList.add('active');

        // 위치 계산
        const triggerRect = triggerBtn.getBoundingClientRect();
        const optionsRect = optionsBox.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // 아래 공간 부족하면 위로 열기
        if (triggerRect.bottom + optionsRect.height > viewportHeight) {
          optionsBox.classList.add('drop-up');
        } else {
          optionsBox.classList.remove('drop-up');
        }
      }
    });

    // ✅ 옵션 선택
    optionsBox.querySelectorAll('.custom-select_option').forEach(option => {
      option.addEventListener('click', () => {
        if (nativeSelect.disabled) return; // disabled 시 선택 불가
        const value = option.getAttribute('data-value');

        // native <select> 값 설정
        nativeSelect.value = value;

        // 라벨 변경
        labelSpan.textContent = option.textContent;

        // 닫기
        optionsBox.classList.remove('open');
      });
    });
  });

  // ✅ 외부 클릭 시 모두 닫기
  document.addEventListener('click', () => {
    closeAllSelects();
  });

  // ✅ ESC 키 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllSelects();
    }
  });

  function closeAllSelects() {
    document.querySelectorAll('.custom-select_options.open').forEach(el => {
      el.classList.remove('open');
    });
    document.querySelectorAll('.custom-select_trigger').forEach(el => {
      el.classList.remove('active');
    });
  }
});
/* // allCustomSelects */




/* input date 아이콘 클릭시 달력 나오게 */
document.querySelectorAll(".custom-input-date .btn_triger").forEach(btn => {
	btn.addEventListener("click", () => {
		const group = btn.closest(".custom-input-date");
		const input = group.querySelector("input[type='date']");
		if (!input) return;

		if (typeof input.showPicker === "function") {
			input.showPicker();  // 최신 브라우저 (크롬, 엣지)
		} else {
			input.focus();       // 폴백 (사파리, 파이어폭스 등)
			input.click();
		}
	});
});
/* // input date 아이콘 클릭시 달력 나오게 */





/* 여러 개의 input[type=date]에 모두 오늘 날짜를 기본값으로 세팅 */
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const formatted = `${yyyy}-${mm}-${dd}`;

document.querySelectorAll("input[type='date']").forEach(input => {
  input.value = formatted;
});
/* // 여러 개의 input[type=date]에 모두 오늘 날짜를 기본값으로 세팅 */