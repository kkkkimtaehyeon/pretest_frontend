# 실행 방법
1. 프로젝트 클론
2. 의존성 설치
3. react 앱 실행
```bash
npm start
```
---
# 1. 상태 모델
상태는 화면에서 렌더링을 해야하는가를 기준으로 나누어 모델링했습니다. <br>
### mode
mode는 stopwatch, timer로 이루어져 mode에 따라 사용자가 기능을 빠르고 쉽게 사용하게 합니다. 

요구사항에서의 "기본타이머" 기능을 통상적으로 "stopwatch"로 표현하기 때문에 stopwatch로 표현했습니다. <br>
추가기능으로 목표시간을 설정하고, 목표시간 달성시 알림표시 기능을 "timer"로 표현하였습니다.<br>
App.tsx에서 mode에 따라 **Stopwatch.tsx**와 **Timer.tsx**를 렌더링합니다.

### status
status는 idle, running, paused로 이루어져있습니다. <br>
status를 통해 각 버튼의 활성화 여부와 타이머의 동작 여부를 제어합니다.
- idle: stopwatch / timer가 초기화된 상태로, **Start** 버튼이 활성화됩니다.
- running: stopwatch / timer가 동작 중인 상태로, **Pause**버튼이 활성화됩니다.
- paused: stopwatch / timer가 일시정지된 상태로, **Start**와 **Reset** 버튼이 활성화됩니다.

### time
time은 stopwatch/timer의 UI 표시와 경과시간을 계산하기 위해 사용됩니다.<br>
내부일정 주기로 setTime을 통해 업데이트됩니다.

### inputTime
inputTime은 Timer.tsx에서 목표값을 입력받아 저장하고 UI에 표현하는 객체형태의 상태로 h(시간), m(분), s(초)로 이루어져있습니다. <br>

---

# 2. 시간 계산 방식
현재시간(performance.now())를 기반으로 실제 경과시간을 계산하는 방식으로 시간 계산을 구현했습니다. <br>
- performance.now()
  - 페이지가 로드된 시점을 기준으로합니다. 따라서 Date.now()과 달리 시스템 설정에 영향을 받지 않습니다. 
- 실제 경과시간 = 현재시간 - 시작시간 
  - setInterval의 콜백이 느리게 호출돼도, 현재시간에서 시작버튼을 누른시간을 빼 실제 경과시간을 매번 계산하기 때문에 오차가 누적되지 않습니다.
 
### 타이머 정확도 테스트 (60초)
- performance.now() 기반 실시간 계산 방식
  - 기대 경과 시간: 60000ms
  - 실제 경과 시간: 60003.8ms
  - 지연 발생시간 +3.80ms

### setInterval로 1초마다 이전시간에 1초를 더하는 방식의 문제점
1. 타이머가 1초 남았을 때 500ms 간격으로 중지-시작을 무한 반복할 수 있습니다.
2. setInterval의 콜백이 정확히 1초마다 호출되리란 보장이 없습니다.
3. 이벤트 루프 지연, 탭 전환, 렌더링 부하 등으로 오차가 발생할 수 있습니다.
```text
# 탭 전환으로 인한 시간 오차 
실제 경과 시간: 1011ms
실제 경과 시간: 998ms
실제 경과 시간: 1697ms (탭 전환)
실제 경과 시간: 294ms  (탭 전환)
```
