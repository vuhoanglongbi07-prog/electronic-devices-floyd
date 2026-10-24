<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface ChapterItem {
  id: number
  title: string
  enTitle: string
  part: string
  link?: string
  keyTopics: string
}

const chapters: ChapterItem[] = [
  { id: 1, title: 'Chương 1: Nhập môn Bán dẫn', enTitle: 'Introduction to Semiconductors', part: 'Phần I: Bán dẫn & Diode', link: '/chapters/ch01-semiconductors', keyTopics: 'Cấu trúc nguyên tử, Dải năng lượng, Hạt dẫn e/lỗ trống, Bán dẫn loại N & P, Chuyển tiếp P-N' },
  { id: 2, title: 'Chương 2: Diode và Ứng dụng', enTitle: 'Diodes and Applications', part: 'Phần I: Bán dẫn & Diode', link: '/chapters/ch02-diodes', keyTopics: '3 mô hình Diode (Ideal/Practical/Complete), Đường tải DC, Mạch chỉnh lưu nửa chu kỳ/cả chu kỳ, Mạch xén & ghim áp' },
  { id: 3, title: 'Chương 3: Các loại Diode đặc biệt', enTitle: 'Special-Purpose Diodes', part: 'Phần I: Bán dẫn & Diode', link: '/chapters/ch03-special-diodes', keyTopics: 'Diode Zener ổn áp, Varactor, LED, Photodiode, Schottky, Laser Diode' },
  { id: 4, title: 'Chương 4: Transistor lưỡng cực (BJT)', enTitle: 'Bipolar Junction Transistors (BJTs)', part: 'Phần II: Transistor BJT', link: '/chapters/ch04-bjt', keyTopics: 'Cấu tạo NPN/PNP, Hiệu suất tiêm γ, Hệ số truyền vận α_T, Hiệu ứng Early, 3 vùng hoạt động' },
  { id: 5, title: 'Chương 5: Mạch phân cực BJT', enTitle: 'Transistor Bias Circuits', part: 'Phần II: Transistor BJT', link: '/chapters/ch04-bjt', keyTopics: 'Điểm làm việc tĩnh Q-point, Đường tải DC, Giải tích Thevenin cầu phân áp, Ổn định nhiệt' },
  { id: 6, title: 'Chương 6: Khuếch đại tín hiệu nhỏ BJT', enTitle: 'BJT Amplifiers', part: 'Phần II: Transistor BJT', link: '/chapters/ch06-bjt-amplifiers', keyTopics: 'Tuyến tính hóa Taylor, Mô hình r\'_e & Hybrid-π, Mạch CE / Swamped CE / CC / CB' },
  { id: 7, title: 'Chương 7: Khuếch đại công suất BJT', enTitle: 'BJT Power Amplifiers', part: 'Phần II: Transistor BJT', link: '/chapters/ch06-bjt-amplifiers', keyTopics: 'Đường tải xoay chiều AC, Hiệu suất Class A (25%), Class B/AB Push-Pull (78.5%), Class C' },
  { id: 8, title: 'Chương 8: Transistor trường (FET & MOSFET)', enTitle: 'Field-Effect Transistors (FETs)', part: 'Phần III: FET, MOSFET & Đáp ứng tần số', link: '/chapters/ch08-fet-mosfet', keyTopics: 'Hiện tượng thắt kênh JFET, Lớp đảo ngược E-MOSFET, Phương trình Shockley' },
  { id: 9, title: 'Chương 9: Khuếch đại & Chuyển mạch FET', enTitle: 'FET Amplifiers and Switching Circuits', part: 'Phần III: FET, MOSFET & Đáp ứng tần số', link: '/chapters/ch08-fet-mosfet', keyTopics: 'Hỗ dẫn vi phân g_m, Mạch CS / CD / CG, Khuếch đại Class D, Chuyển mạch CMOS' },
  { id: 10, title: 'Chương 10: Đáp ứng tần số mạch khuếch đại', enTitle: 'Amplifier Frequency Response', part: 'Phần III: FET, MOSFET & Đáp ứng tần số', link: '/chapters/Roadmap-part2', keyTopics: 'Decibel (dB), Tần số cắt thấp & cao, Điện dung ký sinh Miller, Giản đồ Bode' },
  { id: 11, title: 'Chương 11: Thyristor', enTitle: 'Thyristors', part: 'Phần IV: Op-Amp & Mạch hệ thống', link: '/chapters/Roadmap-part2', keyTopics: 'Linh kiện 4 lớp, SCR, DIAC, TRIAC, UJT, PUT' },
  { id: 12, title: 'Chương 12: Khuếch đại thuật toán (Op-Amp)', enTitle: 'The Operational Amplifier', part: 'Phần IV: Op-Amp & Mạch hệ thống', link: '/chapters/Roadmap-part2', keyTopics: 'CMRR, Slew Rate, Hồi tiếp âm, Khuếch đại đảo (Inverting), Không đảo (Non-inverting), Lặp điện áp' },
  { id: 13, title: 'Chương 13: Các mạch Op-Amp cơ bản', enTitle: 'Basic Op-Amp Circuits', part: 'Phần IV: Op-Amp & Mạch hệ thống', link: '/chapters/Roadmap-part2', keyTopics: 'Bộ so sánh (Comparator), Schmitt Trigger, Mạch cộng (Summing), Mạch tích phân & vi phân' },
  { id: 14, title: 'Chương 14: Mạch Op-Amp chuyên dụng', enTitle: 'Special-Purpose Op-Amp Circuits', part: 'Phần IV: Op-Amp & Mạch hệ thống', link: '/chapters/Roadmap-part2', keyTopics: 'Khuếch đại đo lường (Instrumentation Amp), Isolation Amp, OTA, Mạch Log/Antilog' },
  { id: 15, title: 'Chương 15: Mạch lọc tích cực (Active Filters)', enTitle: 'Active Filters', part: 'Phần IV: Op-Amp & Mạch hệ thống', link: '/chapters/Roadmap-part2', keyTopics: 'Đáp ứng Butterworth / Chebyshev / Bessel, Lọc thông thấp / thông cao / thông dải Sallen-Key' },
  { id: 16, title: 'Chương 16: Mạch dao động (Oscillators)', enTitle: 'Oscillators', part: 'Phần IV: Op-Amp & Mạch hệ thống', link: '/chapters/Roadmap-part2', keyTopics: 'Tiêu chuẩn Barkhausen, Dao động cầu Wien, Dịch pha, Colpitts, Hartley, IC 555 Timer' },
  { id: 17, title: 'Chương 17: Mạch ổn áp (Voltage Regulators)', enTitle: 'Voltage Regulators', part: 'Phần IV: Op-Amp & Mạch hệ thống', link: '/chapters/Roadmap-part2', keyTopics: 'Ổn áp tuyến tính nối tiếp & song song, Ổn áp xung (Buck, Boost), IC họ 78xx/LM317' },
  { id: 18, title: 'Chương 18: Mạch thông tin (Communications)', enTitle: 'Communications Circuits', part: 'Phần IV: Op-Amp & Mạch hệ thống', link: '/chapters/Roadmap-part2', keyTopics: 'Bộ nhân tuyến tính, Điều chế AM / FM, Bộ trộn tần (Mixer), Vòng khóa pha (PLL)' }
]

// State stored as { [chapterId]: { theory: boolean, sim: boolean, quiz: boolean } }
const progress = ref<Record<number, { theory: boolean; sim: boolean; quiz: boolean }>>({})

const STORAGE_KEY = 'floyd_electronic_devices_progress_v1'

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      progress.value = JSON.parse(raw)
    }
  } catch (e) {
    console.error(e)
  }
})

function toggleStep(chId: number, step: 'theory' | 'sim' | 'quiz') {
  if (!progress.value[chId]) {
    progress.value[chId] = { theory: false, sim: false, quiz: false }
  }
  progress.value[chId][step] = !progress.value[chId][step]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress.value))
  } catch (e) {
    console.error(e)
  }
}

const totalTasks = chapters.length * 3
const completedTasks = computed(() => {
  let count = 0
  for (const ch of chapters) {
    const p = progress.value[ch.id]
    if (p) {
      if (p.theory) count++
      if (p.sim) count++
      if (p.quiz) count++
    }
  }
  return count
})

const percentDone = computed(() => Math.round((completedTasks.value / totalTasks) * 100))
</script>

<template>
  <div class="sim-card">
    <div class="tracker-header">
      <div>
        <h3 style="margin: 0 0 4px 0;">📊 Bảng Theo Dõi Tiến Độ Học Sách (18 Chương - Thomas L. Floyd)</h3>
        <p style="margin: 0; font-size: 0.9rem; opacity: 0.85;">
          Đánh dấu từng bước: <strong>(1) Đọc tóm tắt bản chất</strong> → <strong>(2) Thực hành mô phỏng</strong> → <strong>(3) Làm Quiz phản xạ</strong>. Tiến độ tự lưu trên trình duyệt của bạn.
        </p>
      </div>
      <div class="progress-badge">
        <div class="progress-num">{{ percentDone }}%</div>
        <div class="progress-sub">{{ completedTasks }} / {{ totalTasks }} mục</div>
      </div>
    </div>

    <div class="progress-bar-bg">
      <div class="progress-bar-fill" :style="{ width: percentDone + '%' }"></div>
    </div>

    <div class="chapter-grid">
      <div v-for="ch in chapters" :key="ch.id" class="chapter-row">
        <div class="ch-info">
          <div class="ch-title-line">
            <a v-if="ch.link" :href="ch.link" class="ch-title">{{ ch.title }}</a>
            <span v-else class="ch-title">{{ ch.title }}</span>
            <span class="ch-en">({{ ch.enTitle }})</span>
          </div>
          <div class="ch-topics">{{ ch.keyTopics }}</div>
        </div>
        <div class="ch-checks">
          <label class="check-pill" :class="{ active: progress[ch.id]?.theory }">
            <input type="checkbox" :checked="progress[ch.id]?.theory" @change="toggleStep(ch.id, 'theory')" />
            <span>📖 Lý thuyết</span>
          </label>
          <label class="check-pill" :class="{ active: progress[ch.id]?.sim }">
            <input type="checkbox" :checked="progress[ch.id]?.sim" @change="toggleStep(ch.id, 'sim')" />
            <span>🎛️ Mô phỏng</span>
          </label>
          <label class="check-pill" :class="{ active: progress[ch.id]?.quiz }">
            <input type="checkbox" :checked="progress[ch.id]?.quiz" @change="toggleStep(ch.id, 'quiz')" />
            <span>⚡ Ôn tập</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.progress-badge {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 10px;
  padding: 8px 16px;
  text-align: center;
  min-width: 110px;
}
.progress-num {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  line-height: 1.1;
}
.progress-sub {
  font-size: 0.75rem;
  opacity: 0.8;
}
.progress-bar-bg {
  height: 10px;
  background: var(--vp-c-bg-mute);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 18px;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  transition: width 0.3s ease;
}
.chapter-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 520px;
  overflow-y: auto;
  padding-right: 4px;
}
.chapter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  flex-wrap: wrap;
}
.ch-info {
  flex: 1;
  min-width: 240px;
}
.ch-title {
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
}
.ch-en {
  font-size: 0.8rem;
  opacity: 0.65;
  margin-left: 6px;
}
.ch-topics {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 3px;
}
.ch-checks {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.check-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  user-select: none;
  transition: all 0.15s;
}
.check-pill input {
  display: none;
}
.check-pill.active {
  background: rgba(16, 185, 129, 0.15);
  border-color: #10b981;
  color: #10b981;
  font-weight: 600;
}
</style>
