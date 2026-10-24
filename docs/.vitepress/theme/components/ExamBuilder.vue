<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface GeneratedQuestion {
  id: string
  chapter: number
  chapterName: string
  type: 'theory' | 'calculation'
  question: string
  circuitAscii?: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface ExamAttempt {
  date: string
  score10: string
  correct: number
  total: number
  chapters: string
  durationSec: number
}

// Available chapter groups
const chapterGroups = [
  { id: 1, label: 'Ch. 1: Nhập môn Bán dẫn (Semiconductors)' },
  { id: 2, label: 'Ch. 2: Diode & Mạch chỉnh lưu/xén/ghim' },
  { id: 3, label: 'Ch. 3: Diode đặc biệt (Zener, Varactor, LED)' },
  { id: 4, label: 'Ch. 4 & 5: Transistor BJT & Phân cực DC' },
  { id: 6, label: 'Ch. 6 & 7: Khuếch đại xoay chiều BJT (r\'_e)' },
  { id: 8, label: 'Ch. 8–16: FET, MOSFET & Op-Amp' }
]

const selectedChapters = ref<number[]>([1, 2, 3, 4])
const questionCount = ref<number>(10)
const questionMix = ref<'both' | 'calculation' | 'theory'>('both')
const examMode = ref<'exam' | 'practice'>('exam')
const timeLimitMin = ref<number>(15)

// Active exam state
const examStarted = ref<boolean>(false)
const examSubmitted = ref<boolean>(false)
const activeQuestions = ref<GeneratedQuestion[]>([])
const userAnswers = ref<Record<number, number>>({})
const remainingSec = ref<number>(0)
const elapsedSec = ref<number>(0)
let timerHandle: ReturnType<typeof setInterval> | null = null

// Exam history & custom user questions in localStorage
const HISTORY_KEY = 'floyd_exam_history_v1'
const CUSTOM_Q_KEY = 'floyd_custom_questions_v1'
const examHistory = ref<ExamAttempt[]>([])
const customQuestions = ref<GeneratedQuestion[]>([])

// Custom question form state
const showCustomForm = ref<boolean>(false)
const newQChapter = ref<number>(1)
const newQText = ref<string>('')
const newQOpts = ref<string[]>(['', '', '', ''])
const newQCorrect = ref<number>(0)
const newQExp = ref<string>('')

onMounted(() => {
  try {
    const h = localStorage.getItem(HISTORY_KEY)
    if (h) examHistory.value = JSON.parse(h)
    const c = localStorage.getItem(CUSTOM_Q_KEY)
    if (c) customQuestions.value = JSON.parse(c)
  } catch (e) {
    console.error(e)
  }
})

onUnmounted(() => {
  stopTimer()
})

function stopTimer() {
  if (timerHandle) {
    clearInterval(timerHandle)
    timerHandle = null
  }
}

function toggleChapter(chId: number) {
  const idx = selectedChapters.value.indexOf(chId)
  if (idx >= 0) {
    if (selectedChapters.value.length > 1) {
      selectedChapters.value.splice(idx, 1)
    }
  } else {
    selectedChapters.value.push(chId)
  }
}

function selectAllChapters() {
  selectedChapters.value = chapterGroups.map((c) => c.id)
}

// Helper for random choice and shuffling options while tracking correct answer
function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildNumericOptions(correctVal: number, unit: string, decimals = 2): { options: string[]; correctIndex: number } {
  const corrStr = `${correctVal.toFixed(decimals)} ${unit}`
  const multipliers = [0.5, 0.72, 0.85, 1.18, 1.35, 1.6, 2.0]
  const distractors = new Set<string>()
  while (distractors.size < 3) {
    const m = randItem(multipliers)
    const candidate = Math.max(0.01, correctVal * m + (Math.random() - 0.5) * 0.4)
    const s = `${candidate.toFixed(decimals)} ${unit}`
    if (s !== corrStr) distractors.add(s)
  }
  const all = [corrStr, ...Array.from(distractors)]
  // Shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[all[i], all[j]] = [all[j], all[i]]
  }
  return {
    options: all,
    correctIndex: all.indexOf(corrStr)
  }
}

// Dynamic Parametric Circuit Problem Generators (Infinite variations!)
function generateDynamicProblem(chapter: number, idx: number): GeneratedQuestion {
  if (chapter === 1) {
    // Barrier potential temperature dependency or Shell capacity
    const subType = Math.random() < 0.5 ? 'temp' : 'shell'
    if (subType === 'temp') {
      const mat = Math.random() < 0.7 ? 'Silicon (Si)' : 'Germanium (Ge)'
      const vBase = mat.includes('Si') ? 0.7 : 0.3
      const tempRise = randItem([50, 65, 75, 85, 100, 125])
      const deltaT = tempRise - 25
      const vNew = vBase - 0.002 * deltaT
      const { options, correctIndex } = buildNumericOptions(vNew, 'V', 3)
      return {
        id: `dyn-ch1-${idx}`,
        chapter: 1,
        chapterName: 'Ch. 1: Bán dẫn',
        type: 'calculation',
        question: `[Bài toán sinh tự động] Biết rào thế của chuyển tiếp P-N làm bằng ${mat} ở 25°C là V_B = ${vBase} V và hệ số nhiệt là -2 mV/°C. Khi nhiệt độ tinh thể tăng lên tới T = ${tempRise}°C thì hàng rào thế V_B giảm xuống còn bao nhiêu?`,
        options,
        correctIndex,
        explanation: `Độ tăng nhiệt độ ΔT = ${tempRise}°C - 25°C = ${deltaT}°C. Độ giảm rào thế ΔV_B = ${deltaT} × 2 mV = ${(deltaT * 0.002).toFixed(3)} V. Vậy V_B(${tempRise}°C) = ${vBase} - ${(deltaT * 0.002).toFixed(3)} = ${vNew.toFixed(3)} V.`
      }
    } else {
      const n = randItem([2, 3, 4, 5])
      const maxE = 2 * n * n
      const opts = [`${n * n} electron`, `${maxE} electron`, `${2 * n} electron`, `${maxE + 4} electron`]
      return {
        id: `dyn-ch1-shell-${idx}`,
        chapter: 1,
        chapterName: 'Ch. 1: Bán dẫn',
        type: 'calculation',
        question: `[Bài toán sinh tự động] Theo công thức Bohr N_e = 2n², lớp quỹ đạo thứ n = ${n} của nguyên tử có thể chứa tối đa bao nhiêu electron?`,
        options: opts,
        correctIndex: 1,
        explanation: `Áp dụng công thức N_e = 2n² = 2 × (${n})² = ${maxE} electron.`
      }
    }
  }

  if (chapter === 2) {
    // 3 variations: Practical Diode DC circuit, Full-Wave Bridge Rectifier, or Center-Tapped Rectifier
    const variant = randItem(['dc_diode', 'bridge_rect', 'ct_rect'])
    if (variant === 'dc_diode') {
      const vBias = randItem([5, 6, 8, 9, 10, 12, 15, 18, 24])
      const rLim = randItem([220, 330, 470, 560, 680, 1000, 1200])
      const ifMa = ((vBias - 0.7) / rLim) * 1000
      const { options, correctIndex } = buildNumericOptions(ifMa, 'mA', 2)
      return {
        id: `dyn-ch2-dc-${idx}`,
        chapter: 2,
        chapterName: 'Ch. 2: Diode & Ứng dụng',
        type: 'calculation',
        question: `[Bài toán mạch tự động] Cho mạch phân cực thuận gồm nguồn V_BIAS = ${vBias} V mắc nối tiếp điện trở hạn dòng R_LIMIT = ${rLim} Ω và 1 Diode Silicon (mô hình thực tế V_F = 0.7 V). Tính dòng thuận I_F qua Diode:`,
        circuitAscii: `[ + ${vBias}V ] ───[ R_LIMIT = ${rLim} Ω ]───▷|───⏚ (Si: V_F = 0.7V)`,
        options,
        correctIndex,
        explanation: `Theo mô hình thực tế (Practical Model): I_F = (V_BIAS - 0.7 V) / R_LIMIT = (${vBias} - 0.7) / ${rLim} = ${(vBias - 0.7).toFixed(1)} / ${rLim} = ${ifMa.toFixed(2)} mA.`
      }
    } else if (variant === 'bridge_rect') {
      const vpSec = randItem([12, 15, 18, 20, 24, 30, 36])
      const vpOut = vpSec - 1.4
      const vAvg = (2 * vpOut) / Math.PI
      const { options, correctIndex } = buildNumericOptions(vAvg, 'V', 2)
      return {
        id: `dyn-ch2-br-${idx}`,
        chapter: 2,
        chapterName: 'Ch. 2: Diode & Ứng dụng',
        type: 'calculation',
        question: `[Bài toán mạch tự động] Một bộ chỉnh lưu cầu cả chu kỳ (Full-Wave Bridge Rectifier) dùng 4 Diode Silicon nhận điện áp đỉnh thứ cấp V_p(sec) = ${vpSec} V. Tính điện áp một chiều trung bình V_AVG trên tải (theo Practical Model):`,
        circuitAscii: `V_p(sec) = ${vpSec}V  ──► [ Cầu 4 Diode Si (-1.4V) ] ──► V_p(out) = ${vpOut.toFixed(1)}V ──► V_AVG = ?`,
        options,
        correctIndex,
        explanation: `Bước 1: Trong chỉnh lưu cầu luôn có 2 Diode dẫn nối tiếp mỗi bán kỳ → V_p(out) = V_p(sec) - 1.4 V = ${vpSec} - 1.4 = ${vpOut.toFixed(1)} V.\nBước 2: Điện áp trung bình cả chu kỳ V_AVG = (2 × V_p(out)) / π = (2 × ${vpOut.toFixed(1)}) / 3.1416 ≈ ${vAvg.toFixed(2)} V.`
      }
    } else {
      const vpSec = randItem([20, 24, 30, 40, 50])
      const vpOut = vpSec / 2 - 0.7
      const piv = 2 * vpOut + 0.7
      const { options, correctIndex } = buildNumericOptions(piv, 'V', 1)
      return {
        id: `dyn-ch2-ct-${idx}`,
        chapter: 2,
        chapterName: 'Ch. 2: Diode & Ứng dụng',
        type: 'calculation',
        question: `[Bài toán mạch tự động] Mạch chỉnh lưu cả chu kỳ dùng biến áp có điểm giữa (Center-Tapped Full-Wave) có tổng điện áp đỉnh toàn cuộn thứ cấp V_p(sec) = ${vpSec} V (mỗi nửa cuộn là ${vpSec / 2} V). Tính điện áp ngược cực đại (PIV) đặt lên mỗi Diode Silicon:`,
        options,
        correctIndex,
        explanation: `Đỉnh áp ra tải V_p(out) = (V_p(sec)/2) - 0.7V = ${vpSec / 2} - 0.7 = ${vpOut.toFixed(1)} V. Điện áp ngược cực đại PIV của mạch Center-Tapped là: PIV = 2·V_p(out) + 0.7V = 2×${vpOut.toFixed(1)} + 0.7 = ${piv.toFixed(1)} V.`
      }
    }
  }

  if (chapter === 3) {
    // Zener regulator calculation
    const vz = randItem([5.1, 6.8, 9.1, 10, 12])
    const vin = vz + randItem([6, 8, 10, 12])
    const rSeries = randItem([150, 200, 220, 330, 470])
    const rl = randItem([470, 680, 1000, 1200])
    const iTotalMa = ((vin - vz) / rSeries) * 1000
    const iLoadMa = (vz / rl) * 1000
    const izMa = Math.max(0, iTotalMa - iLoadMa)
    const { options, correctIndex } = buildNumericOptions(izMa, 'mA', 2)
    return {
      id: `dyn-ch3-zener-${idx}`,
      chapter: 3,
      chapterName: 'Ch. 3: Diode đặc biệt',
      type: 'calculation',
      question: `[Bài toán Zener tự động] Cho mạch ổn áp Zener có V_Z = ${vz} V, nguồn vào V_IN = ${vin.toFixed(1)} V, điện trở hạn dòng nối tiếp R = ${rSeries} Ω và tải R_L = ${rl} Ω mắc song song với Zener. Tính dòng điện I_Z chạy qua Diode Zener:`,
      circuitAscii: `[ V_IN = ${vin.toFixed(1)}V ] ───[ R = ${rSeries}Ω ]───┬───[ R_L = ${rl}Ω ]\n                                 └───◁| (Zener V_Z = ${vz}V)`,
      options,
      correctIndex,
      explanation: `Bước 1: Dòng tổng qua điện trở R là I_T = (V_IN - V_Z)/R = (${vin.toFixed(1)} - ${vz})/${rSeries} = ${iTotalMa.toFixed(2)} mA.\nBước 2: Dòng qua tải I_L = V_Z / R_L = ${vz} / ${rl} = ${iLoadMa.toFixed(2)} mA.\nBước 3: Dòng qua Zener I_Z = I_T - I_L = ${iTotalMa.toFixed(2)} - ${iLoadMa.toFixed(2)} = ${izMa.toFixed(2)} mA.`
    }
  }

  if (chapter === 4) {
    // Voltage-Divider Bias BJT calculation
    const vcc = randItem([10, 12, 15, 18, 20])
    const r1 = randItem([22, 33, 39, 47]) // kOhm
    const r2 = randItem([4.7, 6.8, 10, 12]) // kOhm
    const rc = randItem([1.0, 1.2, 1.5, 2.2]) // kOhm
    const re = randItem([0.47, 0.68, 1.0]) // kOhm
    const vb = (r2 / (r1 + r2)) * vcc
    const ve = Math.max(0.1, vb - 0.7)
    const ieMa = ve / re // since re is in kOhm, V / kOhm = mA
    const vce = vcc - ieMa * (rc + re)
    const { options, correctIndex } = buildNumericOptions(vce, 'V', 2)
    return {
      id: `dyn-ch4-vdb-${idx}`,
      chapter: 4,
      chapterName: 'Ch. 4 & 5: BJT & Phân cực',
      type: 'calculation',
      question: `[Bài toán BJT tự động] Cho mạch phân cực cầu phân áp (Voltage-Divider Bias, giả sử cầu cứng β_DC·R_E ≥ 10R_2) với V_CC = ${vcc} V, R_1 = ${r1} kΩ, R_2 = ${r2} kΩ, R_C = ${rc} kΩ, R_E = ${re} kΩ. Tính điện áp phân cực V_CE của BJT:`,
      circuitAscii: `V_CC = ${vcc}V  |  R1 = ${r1}kΩ, R2 = ${r2}kΩ  |  R_C = ${rc}kΩ, R_E = ${re}kΩ`,
      options,
      correctIndex,
      explanation: `Bước 1: V_B ≈ [R_2 / (R_1 + R_2)] × V_CC = [${r2} / (${r1} + ${r2})] × ${vcc} = ${vb.toFixed(2)} V.\nBước 2: V_E = V_B - 0.7 V = ${ve.toFixed(2)} V.\nBước 3: I_C ≈ I_E = V_E / R_E = ${ve.toFixed(2)}V / ${re}kΩ = ${ieMa.toFixed(2)} mA.\nBước 4: V_CE = V_CC - I_C(R_C + R_E) = ${vcc} - ${ieMa.toFixed(2)}×(${rc} + ${re}) = ${vce.toFixed(2)} V.`
    }
  }

  if (chapter === 6) {
    // CE Amplifier voltage gain with r'_e
    const ieMa = randItem([1.0, 1.25, 2.0, 2.5, 4.0, 5.0])
    const rePrime = 25 / ieMa // Ohms
    const rcOhm = randItem([1000, 1500, 2200, 3300])
    const rlOhm = randItem([2200, 3300, 4700, 10000])
    const rcAc = (rcOhm * rlOhm) / (rcOhm + rlOhm)
    const av = rcAc / rePrime
    const { options, correctIndex } = buildNumericOptions(av, 'lần', 1)
    return {
      id: `dyn-ch6-ce-${idx}`,
      chapter: 6,
      chapterName: 'Ch. 6 & 7: Khuếch đại BJT',
      type: 'calculation',
      question: `[Bài toán Khuếch đại CE tự động] Mạch khuếch đại cực phát chung (CE có tụ bypass C_E nối tắt hoàn toàn R_E) hoạt động ở dòng tĩnh I_E = ${ieMa} mA, có R_C = ${rcOhm} Ω ghép tụ ra tải R_L = ${rlOhm} Ω. Tính độ lợi điện áp xoay chiều A_v:`,
      options,
      correctIndex,
      explanation: `Bước 1: Điện trở động cực phát r'_e = 25 mV / I_E = 25 mV / ${ieMa} mA = ${rePrime.toFixed(2)} Ω.\nBước 2: Điện trở tải xoay chiều cực góp R_c = R_C || R_L = (${rcOhm} × ${rlOhm}) / (${rcOhm} + ${rlOhm}) = ${rcAc.toFixed(1)} Ω.\nBước 3: Độ lợi áp A_v = R_c / r'_e = ${rcAc.toFixed(1)} / ${rePrime.toFixed(2)} ≈ ${av.toFixed(1)} lần.`
    }
  }

  // Chapter 8–16: JFET Shockley equation or Non-inverting Op-Amp
  const isOpAmp = Math.random() < 0.5
  if (isOpAmp) {
    const rf = randItem([22, 47, 68, 100, 150]) // kOhm
    const ri = randItem([2.2, 4.7, 10]) // kOhm
    const acl = 1 + rf / ri
    const { options, correctIndex } = buildNumericOptions(acl, 'lần', 2)
    return {
      id: `dyn-ch12-opamp-${idx}`,
      chapter: 8,
      chapterName: 'Ch. 8–16: FET & Op-Amp',
      type: 'calculation',
      question: `[Bài toán Op-Amp tự động] Cho mạch khuếch đại thuật toán KHÔNG ĐẢO (Non-inverting Amplifier) có điện trở hồi tiếp âm R_f = ${rf} kΩ và điện trở nối đất R_i = ${ri} kΩ. Tính hệ số khuếch đại vòng kín A_cl(NI):`,
      options,
      correctIndex,
      explanation: `Với mạch khuếch đại không đảo: A_cl(NI) = 1 + (R_f / R_i) = 1 + (${rf} kΩ / ${ri} kΩ) = ${acl.toFixed(2)} lần.`
    }
  } else {
    const idss = randItem([8, 10, 12, 16, 20]) // mA
    const vgsOff = -randItem([4, 5, 6, 8]) // V
    const vgs = randItem([-1, -1.5, -2, -2.5]) // V
    const id = idss * Math.pow(1 - vgs / vgsOff, 2)
    const { options, correctIndex } = buildNumericOptions(id, 'mA', 2)
    return {
      id: `dyn-ch8-jfet-${idx}`,
      chapter: 8,
      chapterName: 'Ch. 8–16: FET & Op-Amp',
      type: 'calculation',
      question: `[Bài toán JFET tự động] Một JFET kênh N có dòng bão hòa I_DSS = ${idss} mA và điện áp khóa kênh V_GS(off) = ${vgsOff} V. Khi phân cực ở V_GS = ${vgs} V thì dòng cực máng I_D bằng bao nhiêu (theo phương trình Shockley)?`,
      options,
      correctIndex,
      explanation: `Áp dụng phương trình Shockley: I_D = I_DSS × (1 - V_GS / V_GS(off))² = ${idss} × (1 - (${vgs} / ${vgsOff}))² = ${id.toFixed(2)} mA.`
    }
  }
}

// Static Conceptual Question Bank from Floyd
const staticTheoryBank: GeneratedQuestion[] = [
  {
    id: 'th-1-1',
    chapter: 1,
    chapterName: 'Ch. 1: Bán dẫn',
    type: 'theory',
    question: 'Trong bán dẫn loại N (N-Type Semiconductor), hạt dẫn đa số và hạt dẫn thiểu số lần lượt là gì?',
    options: [
      'Đa số: Lỗ trống ; Thiểu số: Electron tự do',
      'Đa số: Electron tự do ; Thiểu số: Lỗ trống',
      'Đa số: Ion dương Donor ; Thiểu số: Ion âm Acceptor',
      'Đa số: Proton ; Thiểu số: Neutron'
    ],
    correctIndex: 1,
    explanation: 'Pha tạp nguyên tố nhóm V (Donor) cung cấp rất nhiều electron tự do (hạt dẫn đa số), còn lỗ trống sinh ra do nhiệt là hạt dẫn thiểu số.'
  },
  {
    id: 'th-1-2',
    chapter: 1,
    chapterName: 'Ch. 1: Bán dẫn',
    type: 'theory',
    question: 'Khi chuyển tiếp P-N được phân cực ngược (Reverse Bias), hiện tượng vật lý nào xảy ra tại mặt ghép?',
    options: [
      'Vùng nghèo (Depletion Region) thu hẹp lại và dòng hạt đa số tăng vọt.',
      'Vùng nghèo (Depletion Region) nở rộng ra và ngăn cản dòng hạt dẫn đa số.',
      'Hàng rào điện thế giảm về 0 V.',
      'Các ion cố định di chuyển tự do ra hai cực.'
    ],
    correctIndex: 1,
    explanation: 'Khi phân cực ngược, cực (+) của nguồn hút electron vùng N ra xa mặt ghép, cực (-) hút lỗ trống vùng P ra xa mặt ghép → làm vùng nghèo nở rộng ra.'
  },
  {
    id: 'th-1-3',
    chapter: 1,
    chapterName: 'Ch. 1: Bán dẫn',
    type: 'theory',
    question: 'Một khối bán dẫn Silicon sau khi được pha tạp nguyên tố Boron (nhóm III) để trở thành bán dẫn loại P thì điện tích tổng thể của cả khối là gì?',
    options: [
      'Mang điện tích dương vì có nhiều lỗ trống.',
      'Mang điện tích âm vì có các ion Acceptor âm.',
      'Trung hòa về điện (tổng số proton vẫn bằng tổng số electron trong tinh thể).',
      'Phụ thuộc vào nhiệt độ phòng.'
    ],
    correctIndex: 2,
    explanation: 'Mọi nguyên tử Boron đưa vào đều trung hòa về điện (5 proton, 5 electron). Chữ P chỉ có nghĩa là hạt dẫn tự do đa số là lỗ trống (+), còn cả tinh thể hoàn toàn trung hòa về điện.'
  },
  {
    id: 'th-2-1',
    chapter: 2,
    chapterName: 'Ch. 2: Diode & Ứng dụng',
    type: 'theory',
    question: 'Trong ba mô hình Diode của sách Floyd, mô hình nào coi Diode phân cực thuận như một nguồn sụt áp cố định 0.7 V mắc nối tiếp với điện trở động r\'_d?',
    options: [
      'Mô hình Lý tưởng (Ideal Model)',
      'Mô hình Thực tế (Practical Model)',
      'Mô hình Đầy đủ (Complete Model)',
      'Mô hình Đánh thủng Zener'
    ],
    correctIndex: 2,
    explanation: 'Ideal Model: khóa đóng (0 V); Practical Model: nguồn 0.7 V; Complete Model: nguồn 0.7 V nối tiếp r\'_d (và có r\'_R khi phân cực ngược).'
  },
  {
    id: 'th-2-2',
    chapter: 2,
    chapterName: 'Ch. 2: Diode & Ứng dụng',
    type: 'theory',
    question: 'So với mạch chỉnh lưu cả chu kỳ dùng biến áp có điểm giữa (Center-Tapped), mạch chỉnh lưu cầu 4 Diode (Bridge Rectifier) có ưu điểm vượt trội nào khi dùng cùng một cuộn thứ cấp?',
    options: [
      'Chỉ tốn 1 Diode duy nhất.',
      'Không có sụt áp trên Diode.',
      'Cho điện áp ra đỉnh gần gấp đôi và mỗi Diode chỉ phải chịu điện áp ngược cực đại (PIV) bằng một nửa so với Center-Tapped.',
      'Tần số đầu ra cao gấp 4 lần tần số lưới.'
    ],
    correctIndex: 2,
    explanation: 'Với cùng điện áp ra tải V_p(out), Diode trong mạch cầu chỉ chịu PIV = V_p(out) + 0.7V, trong khi mạch Center-Tapped chịu tới PIV = 2V_p(out) + 0.7V.'
  },
  {
    id: 'th-3-1',
    chapter: 3,
    chapterName: 'Ch. 3: Diode đặc biệt',
    type: 'theory',
    question: 'Để sử dụng Diode Zener làm linh kiện ổn áp một chiều và sử dụng Varactor làm tụ điện biến thiên theo điện áp, cả hai linh kiện này phải được phân cực như thế nào?',
    options: [
      'Cả hai đều phân cực thuận.',
      'Cả hai đều phân cực ngược.',
      'Zener phân cực thuận, còn Varactor phân cực ngược.',
      'Zener phân cực ngược, còn Varactor phân cực thuận.'
    ],
    correctIndex: 1,
    explanation: 'Zener hoạt động ở vùng đánh thủng ngược (V_Z), còn Varactor lợi dụng sự thay đổi bề rộng vùng nghèo khi thay đổi điện áp phân cực ngược.'
  },
  {
    id: 'th-4-1',
    chapter: 4,
    chapterName: 'Ch. 4 & 5: BJT & Phân cực',
    type: 'theory',
    question: 'Tại sao vùng Base (cực gốc) của Transistor BJT lại được chế tạo cực kỳ mỏng và pha tạp rất nhẹ?',
    options: [
      'Để giảm chi phí sản xuất Silicon.',
      'Để hạn chế tối đa sự tái hợp tại Base, giúp hơn 98% hạt dẫn từ Emitter khuếch tán thẳng sang Collector.',
      'Để tăng dòng cực gốc I_B lên lớn hơn dòng I_C.',
      'Để vùng Base tỏa nhiệt tốt hơn Collector.'
    ],
    correctIndex: 1,
    explanation: 'Base mỏng và ít tạp chất giúp hạt dẫn đa số từ Emitter phun sang không bị tái hợp nhiều ở Base (I_B rất nhỏ) mà vượt qua mặt ghép B-C để tạo thành dòng I_C lớn.'
  },
  {
    id: 'th-4-2',
    chapter: 4,
    chapterName: 'Ch. 4 & 5: BJT & Phân cực',
    type: 'theory',
    question: 'Khi sử dụng BJT làm khóa điện tử (Switch), ở trạng thái ĐÓNG (ON) và trạng thái MỞ (OFF) thì điểm làm việc của BJT nằm ở đâu trên đường tải?',
    options: [
      'ON: Vùng Khuếch đại (Active) ; OFF: Vùng Ngắt (Cut-off)',
      'ON: Vùng Bão hòa (Saturation, V_CE ≈ 0.2V) ; OFF: Vùng Ngắt (Cut-off, V_CE = V_CC)',
      'ON: Vùng Ngắt (Cut-off) ; OFF: Vùng Bão hòa (Saturation)',
      'Luôn nằm chính giữa đường tải DC.'
    ],
    correctIndex: 1,
    explanation: 'Khi làm khóa chuyển mạch (Switch), BJT chỉ nhảy giữa 2 đầu mút của đường tải: Bão hòa (Saturation - Khóa đóng) và Ngắt (Cut-off - Khóa hở).'
  },
  {
    id: 'th-6-1',
    chapter: 6,
    chapterName: 'Ch. 6 & 7: Khuếch đại BJT',
    type: 'theory',
    question: 'Trong mạch khuếch đại cực phát chung (Common-Emitter - CE), nếu tụ bypass C_E mắc song song với điện trở R_E bị đứt (hở mạch) thì độ lợi điện áp A_v và trở kháng vào R_in thay đổi như thế nào?',
    options: [
      'Độ lợi áp A_v tăng vọt, trở kháng vào giảm.',
      'Độ lợi áp A_v giảm mạnh (do xuất hiện hồi tiếp âm qua R_E), nhưng trở kháng vào nhìn từ Base tăng lên.',
      'Mạch mất phân cực một chiều và ngừng hoạt động.',
      'Không có gì thay đổi vì tụ điện chỉ ảnh hưởng đến dòng DC.'
    ],
    correctIndex: 1,
    explanation: 'Khi mất tụ bypass C_E, mẫu số của độ lợi áp trở thành (r\'_e + R_E) thay vì chỉ có r\'_e → độ lợi A_v giảm mạnh nhưng tính ổn định và trở vào R_in(base) = β_ac(r\'_e + R_E) tăng lên.'
  },
  {
    id: 'th-8-1',
    chapter: 8,
    chapterName: 'Ch. 8–16: FET & Op-Amp',
    type: 'theory',
    question: 'Sự khác biệt quan trọng nhất về mặt điều khiển và trở kháng ngõ vào giữa Transistor trường (FET/MOSFET) và Transistor lưỡng cực (BJT) là gì?',
    options: [
      'FET điều khiển bằng dòng điện và có trở vào rất thấp; BJT điều khiển bằng điện áp.',
      'FET điều khiển bằng điện áp (V_GS) và có trở kháng ngõ vào cực kỳ cao (I_G ≈ 0); còn BJT điều khiển bằng dòng điện (I_B).',
      'FET chỉ hoạt động với dòng xoay chiều.',
      'BJT là linh kiện đơn cực, còn FET là linh kiện lưỡng cực.'
    ],
    correctIndex: 1,
    explanation: 'JFET có tiếp giáp G-S phân cực ngược và MOSFET có lớp cách điện SiO₂ ở cực Gate nên dòng I_G ≈ 0 → FET là linh kiện điều khiển bằng điện áp (Voltage-controlled) với trở kháng vào cực lớn.'
  }
]

function generateExam() {
  stopTimer()
  userAnswers.value = {}
  examSubmitted.value = false

  const poolTheory = [...staticTheoryBank, ...customQuestions.value].filter((q) =>
    selectedChapters.value.includes(q.chapter)
  )

  const result: GeneratedQuestion[] = []
  const targetCount = questionCount.value

  // Shuffle theory pool
  const shuffledTheory = [...poolTheory].sort(() => Math.random() - 0.5)

  for (let i = 0; i < targetCount; i++) {
    const ch = randItem(selectedChapters.value)
    if (questionMix.value === 'calculation') {
      result.push(generateDynamicProblem(ch, i))
    } else if (questionMix.value === 'theory') {
      if (i < shuffledTheory.length) {
        result.push(shuffledTheory[i])
      } else {
        result.push(generateDynamicProblem(ch, i))
      }
    } else {
      // 'both': 50% theory, 50% dynamic calculation
      if (i % 2 === 0 && shuffledTheory.length > 0) {
        const thQ = shuffledTheory.pop()!
        result.push(thQ)
      } else {
        result.push(generateDynamicProblem(ch, i))
      }
    }
  }

  activeQuestions.value = result
  examStarted.value = true
  elapsedSec.value = 0

  if (examMode.value === 'exam') {
    remainingSec.value = timeLimitMin.value * 60
    timerHandle = setInterval(() => {
      elapsedSec.value++
      if (remainingSec.value > 0) {
        remainingSec.value--
      } else {
        submitExam()
      }
    }, 1000)
  }
}

function chooseAnswer(qIdx: number, optIdx: number) {
  if (examSubmitted.value) return
  userAnswers.value[qIdx] = optIdx
}

const answeredCount = computed(() => Object.keys(userAnswers.value).length)

const scoreSummary = computed(() => {
  const total = activeQuestions.value.length
  if (total === 0) return { correct: 0, total: 0, pct: 0, score10: '0.0' }
  let correct = 0
  activeQuestions.value.forEach((q, idx) => {
    if (userAnswers.value[idx] === q.correctIndex) correct++
  })
  const pct = Math.round((correct / total) * 100)
  const score10 = ((correct / total) * 10).toFixed(1)
  return { correct, total, pct, score10 }
})

function submitExam() {
  stopTimer()
  examSubmitted.value = true

  const attempt: ExamAttempt = {
    date: new Date().toLocaleString('vi-VN'),
    score10: scoreSummary.value.score10,
    correct: scoreSummary.value.correct,
    total: scoreSummary.value.total,
    chapters: selectedChapters.value.map((c) => `Ch.${c}`).join(', '),
    durationSec: elapsedSec.value
  }
  examHistory.value.unshift(attempt)
  if (examHistory.value.length > 15) examHistory.value.pop()
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(examHistory.value))
  } catch (e) {
    console.error(e)
  }
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function addCustomQuestion() {
  if (!newQText.value.trim() || newQOpts.value.some((o) => !o.trim())) return
  const chObj = chapterGroups.find((c) => c.id === newQChapter.value)
  const q: GeneratedQuestion = {
    id: `custom-${Date.now()}`,
    chapter: newQChapter.value,
    chapterName: chObj ? chObj.label : `Ch. ${newQChapter.value}`,
    type: 'theory',
    question: `[Câu hỏi tự tạo] ${newQText.value.trim()}`,
    options: newQOpts.value.map((o) => o.trim()),
    correctIndex: newQCorrect.value,
    explanation: newQExp.value.trim() || 'Câu hỏi do bạn tự biên soạn.'
  }
  customQuestions.value.push(q)
  try {
    localStorage.setItem(CUSTOM_Q_KEY, JSON.stringify(customQuestions.value))
  } catch (e) {
    console.error(e)
  }
  newQText.value = ''
  newQOpts.value = ['', '', '', '']
  newQExp.value = ''
  showCustomForm.value = false
}

function clearHistory() {
  examHistory.value = []
  localStorage.removeItem(HISTORY_KEY)
}

function formatMathHtml(text: string): string {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\^(\-?\d+)/g, '<sup>$1</sup>')
    .replace(/\b([a-zA-Z])'_([a-zA-Z0-9()+\-]+)\b/g, "<i>$1'</i><sub>$2</sub>")
    .replace(/(β|α|τ|μ|ε|Δ)_([a-zA-Z0-9()+\-]+)/g, '<i>$1</i><sub>$2</sub>')
    .replace(/\b([A-Za-z]{1,2})_([a-zA-Z0-9()+,\-]+)\b/g, '<i>$1</i><sub>$2</sub>')
}
</script>

<template>
  <div class="exam-wrapper">
    <!-- Configuration Panel -->
    <div class="sim-card config-card">
      <div class="cfg-top">
        <div>
          <h3 style="margin: 0 0 4px 0;">🛠️ Trình Tạo Đề Kiểm Tra & Sinh Bài Tập Mạch Tự Động</h3>
          <p style="margin: 0; font-size: 0.86rem; opacity: 0.85;">
            Mỗi lần bấm <strong>"🎲 Tạo Đề Kiểm Tra Mới"</strong>, hệ thống sẽ tự động sinh các thông số mạch điện mới (<i>V</i><sub>CC</sub>, <i>R</i><sub>1</sub>, <i>R</i><sub>2</sub>, <i>V</i><sub>Z</sub>, <i>V</i><sub>p(sec)</sub>...) kèm lời giải từng bước để bạn luyện tập không giới hạn!
          </p>
        </div>
        <button class="secondary-btn" @click="showCustomForm = !showCustomForm">
          {{ showCustomForm ? '✖ Đóng khung thêm câu hỏi' : '➕ Tự thêm câu hỏi của bạn' }}
        </button>
      </div>

      <!-- Optional Custom Question Creator -->
      <div v-if="showCustomForm" class="custom-q-form">
        <h4 style="margin: 0 0 10px 0;">✍️ Thêm câu hỏi ôn tập cá nhân vào ngân hàng đề</h4>
        <div class="form-row">
          <label>Thuộc chương:</label>
          <select v-model.number="newQChapter">
            <option v-for="ch in chapterGroups" :key="ch.id" :value="ch.id">{{ ch.label }}</option>
          </select>
        </div>
        <div class="form-row">
          <label>Nội dung câu hỏi:</label>
          <input type="text" v-model="newQText" placeholder="Nhập câu hỏi lý thuyết hoặc bài tập..." />
        </div>
        <div class="opts-input-grid">
          <div v-for="(_, i) in 4" :key="i" class="opt-input-item">
            <label>
              <input type="radio" :value="i" v-model.number="newQCorrect" />
              Đáp án {{ String.fromCharCode(65 + i) }} (Tích nếu là đáp án ĐÚNG):
            </label>
            <input type="text" v-model="newQOpts[i]" :placeholder="`Nhập lựa chọn ${String.fromCharCode(65 + i)}...`" />
          </div>
        </div>
        <div class="form-row">
          <label>Giải thích đáp án:</label>
          <input type="text" v-model="newQExp" placeholder="Giải thích ngắn gọn tại sao đúng..." />
        </div>
        <button class="primary-btn" @click="addCustomQuestion">💾 Lưu vào ngân hàng câu hỏi ({{ customQuestions.length }} câu đã lưu)</button>
      </div>

      <!-- 1. Chapter selector -->
      <div class="cfg-section">
        <div class="cfg-label-row">
          <strong>1. Chọn các chương muốn kiểm tra:</strong>
          <button class="link-btn" @click="selectAllChapters">Chọn tất cả</button>
        </div>
        <div class="chapter-chips">
          <button
            v-for="ch in chapterGroups"
            :key="ch.id"
            class="ch-chip"
            :class="{ selected: selectedChapters.includes(ch.id) }"
            @click="toggleChapter(ch.id)"
          >
            {{ selectedChapters.includes(ch.id) ? '✓ ' : '' }}{{ ch.label }}
          </button>
        </div>
      </div>

      <!-- 2. Settings row -->
      <div class="cfg-grid-3">
        <div class="cfg-box">
          <label><strong>2. Số lượng câu hỏi:</strong></label>
          <div class="btn-group">
            <button v-for="n in [5, 10, 15, 20]" :key="n" :class="{ active: questionCount === n }" @click="questionCount = n">
              {{ n }} câu
            </button>
          </div>
        </div>

        <div class="cfg-box">
          <label><strong>3. Cấu trúc câu hỏi:</strong></label>
          <div class="btn-group">
            <button :class="{ active: questionMix === 'both' }" @click="questionMix = 'both'">Kết hợp (50/50)</button>
            <button :class="{ active: questionMix === 'calculation' }" @click="questionMix = 'calculation'">100% Tính mạch</button>
            <button :class="{ active: questionMix === 'theory' }" @click="questionMix = 'theory'">Lý thuyết</button>
          </div>
        </div>

        <div class="cfg-box">
          <label><strong>4. Chế độ làm bài:</strong></label>
          <div class="btn-group">
            <button :class="{ active: examMode === 'exam' }" @click="examMode = 'exam'">⏱️ Thi tính giờ ({{ timeLimitMin }}p)</button>
            <button :class="{ active: examMode === 'practice' }" @click="examMode = 'practice'">⚡ Luyện tập (Báo ngay)</button>
          </div>
        </div>
      </div>

      <div class="action-bar">
        <button class="generate-btn" @click="generateExam">
          🎲 Tạo Đề Kiểm Tra Mới ({{ questionCount }} câu)
        </button>
      </div>
    </div>

    <!-- Active Exam View -->
    <div v-if="examStarted" class="sim-card active-exam-card">
      <div class="exam-sticky-bar">
        <div>
          <strong>📋 Đề kiểm tra đang mở:</strong> {{ answeredCount }} / {{ activeQuestions.length }} câu đã chọn
        </div>
        <div class="timer-display" v-if="examMode === 'exam' && !examSubmitted">
          ⏳ Thời gian còn lại: <strong>{{ formatTime(remainingSec) }}</strong>
        </div>
        <button v-if="!examSubmitted" class="submit-exam-btn" @click="submitExam">
          ✅ Nộp Bài & Chấm Điểm
        </button>
      </div>

      <!-- Score Banner after Submit -->
      <div v-if="examSubmitted" class="score-result-banner">
        <div class="score-circle">
          <div class="big-score">{{ scoreSummary.score10 }}<span>/10</span></div>
          <div class="sub-pct">Đúng {{ scoreSummary.correct }}/{{ scoreSummary.total }} ({{ scoreSummary.pct }}%)</div>
        </div>
        <div class="score-feedback">
          <h4 style="margin: 0 0 6px 0;">
            {{
              scoreSummary.pct >= 80
                ? '🏆 Xuất sắc! Bạn đã nắm rất chắc bản chất và công thức giải mạch!'
                : scoreSummary.pct >= 50
                  ? '👍 Khá tốt! Hãy xem kỹ lời giải từng bước ở các câu sai bên dưới nhé.'
                  : '💪 Cần ôn lại! Hãy đọc kỹ phần phân tích từng bước dưới mỗi câu và thử tạo đề mới.'
            }}
          </h4>
          <p style="margin: 0; font-size: 0.86rem;">
            Bạn có thể bấm <strong>"🎲 Tạo Đề Kiểm Tra Mới"</strong> ở phía trên để hệ thống sinh bộ số liệu mạch mới và thử sức lại ngay!
          </p>
        </div>
      </div>

      <!-- Questions List -->
      <div class="exam-q-list">
        <div v-for="(q, qIdx) in activeQuestions" :key="q.id" class="exam-q-item">
          <div class="q-meta">
            <span class="badge-ch">{{ q.chapterName }}</span>
            <span class="badge-type" :class="q.type">
              {{ q.type === 'calculation' ? '🔢 Bài toán tính mạch' : '🧠 Lý thuyết bản chất' }}
            </span>
          </div>

          <div class="q-prompt">
            <strong>Câu {{ qIdx + 1 }}:</strong>
            <span v-html="' ' + formatMathHtml(q.question)"></span>
          </div>

          <pre v-if="q.circuitAscii" class="circuit-box">{{ q.circuitAscii }}</pre>

          <div class="exam-opts">
            <button
              v-for="(opt, optIdx) in q.options"
              :key="optIdx"
              class="exam-opt-btn"
              :class="{
                selected: userAnswers[qIdx] === optIdx && !examSubmitted && examMode === 'exam',
                correct:
                  (examSubmitted || (examMode === 'practice' && userAnswers[qIdx] !== undefined)) &&
                  optIdx === q.correctIndex,
                wrong:
                  (examSubmitted || (examMode === 'practice' && userAnswers[qIdx] !== undefined)) &&
                  userAnswers[qIdx] === optIdx &&
                  optIdx !== q.correctIndex
              }"
              @click="chooseAnswer(qIdx, optIdx)"
            >
              <span class="opt-letter">{{ String.fromCharCode(65 + optIdx) }}.</span>
              <span v-html="formatMathHtml(opt)"></span>
            </button>
          </div>

          <!-- Show explanation immediately in practice mode or after submit in exam mode -->
          <div
            v-if="examSubmitted || (examMode === 'practice' && userAnswers[qIdx] !== undefined)"
            class="solution-box"
            :class="{ right: userAnswers[qIdx] === q.correctIndex }"
          >
            <div>
              <strong>
                {{
                  userAnswers[qIdx] === q.correctIndex
                    ? '✅ Chính xác!'
                    : userAnswers[qIdx] === undefined
                      ? '⚠️ Bạn chưa chọn đáp án.'
                      : '❌ Chưa đúng!'
                }}
              </strong>
              <span> Đáp án đúng là <strong>{{ String.fromCharCode(65 + q.correctIndex) }}</strong>.</span>
            </div>
            <div class="step-exp" v-html="formatMathHtml(q.explanation)"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Exam History Table -->
    <div v-if="examHistory.length > 0" class="sim-card history-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h4 style="margin: 0;">📈 Lịch Sử Làm Bài Kiểm Tra Của Bạn</h4>
        <button class="link-btn" @click="clearHistory">Xóa lịch sử</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Thời điểm</th>
              <th>Phạm vi</th>
              <th>Kết quả</th>
              <th>Điểm hệ 10</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(h, idx) in examHistory" :key="idx">
              <td>{{ h.date }}</td>
              <td>{{ h.chapters }}</td>
              <td>{{ h.correct }} / {{ h.total }} câu</td>
              <td><strong>{{ h.score10 }} / 10</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cfg-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.secondary-btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}
.custom-q-form {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-brand-1);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 16px;
}
.form-row {
  margin-bottom: 10px;
}
.form-row label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.form-row input,
.form-row select,
.opt-input-item input[type='text'] {
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.85rem;
}
.opts-input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  margin-bottom: 10px;
}
.opt-input-item label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  margin-bottom: 4px;
}
.primary-btn {
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
}
.cfg-section {
  margin-bottom: 14px;
}
.cfg-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.9rem;
}
.link-btn {
  background: none;
  border: none;
  color: var(--vp-c-brand-1);
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
}
.chapter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ch-chip {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.15s;
}
.ch-chip.selected {
  background: rgba(37, 99, 235, 0.15);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
.cfg-grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.cfg-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.85rem;
}
.btn-group {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.btn-group button {
  flex: 1;
  padding: 5px 8px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.78rem;
  cursor: pointer;
  white-space: nowrap;
}
.btn-group button.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
  font-weight: 600;
}
.action-bar {
  display: flex;
  justify-content: center;
}
.generate-btn {
  width: 100%;
  max-width: 420px;
  padding: 11px 20px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #10b981);
  color: white;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}
.generate-btn:hover {
  opacity: 0.95;
}
.exam-sticky-bar {
  position: sticky;
  top: 64px;
  z-index: 10;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 10px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.timer-display {
  font-size: 0.95rem;
  color: #f59e0b;
}
.submit-exam-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 7px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.score-result-banner {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(37, 99, 235, 0.14));
  border: 2px solid #10b981;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.score-circle {
  text-align: center;
  min-width: 120px;
  padding: 10px 14px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}
.big-score {
  font-size: 2rem;
  font-weight: 900;
  color: #10b981;
  line-height: 1;
}
.big-score span {
  font-size: 1rem;
  opacity: 0.7;
}
.sub-pct {
  font-size: 0.76rem;
  margin-top: 4px;
  opacity: 0.85;
}
.score-feedback {
  flex: 1;
  min-width: 220px;
}
.exam-q-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.exam-q-item {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 14px 16px;
}
.q-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.badge-ch {
  font-size: 0.74rem;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-weight: 600;
}
.badge-type {
  font-size: 0.74rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}
.badge-type.calculation {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}
.badge-type.theory {
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
}
.q-prompt {
  font-size: 0.94rem;
  margin-bottom: 10px;
  line-height: 1.5;
}
.circuit-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  overflow-x: auto;
  margin: 0 0 10px 0;
}
.exam-opts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 8px;
}
.exam-opt-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
  padding: 9px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.86rem;
  cursor: pointer;
  transition: all 0.15s;
}
.exam-opt-btn:hover {
  border-color: var(--vp-c-brand-1);
}
.exam-opt-btn.selected {
  border-color: var(--vp-c-brand-1);
  background: rgba(37, 99, 235, 0.14);
  font-weight: 700;
}
.exam-opt-btn.correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.18);
  font-weight: 700;
}
.exam-opt-btn.wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.18);
}
.opt-letter {
  font-weight: 800;
  opacity: 0.75;
}
.solution-box {
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.08);
  border-left: 4px solid #ef4444;
  font-size: 0.84rem;
}
.solution-box.right {
  background: rgba(16, 185, 129, 0.08);
  border-left-color: #10b981;
}
.step-exp {
  margin-top: 4px;
  white-space: pre-line;
  opacity: 0.92;
}
</style>
