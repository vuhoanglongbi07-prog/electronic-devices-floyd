import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import ProgressTracker from './components/ProgressTracker.vue'
import PnJunctionSim from './components/PnJunctionSim.vue'
import DiodeLoadLineSim from './components/DiodeLoadLineSim.vue'
import BjtLoadLineSim from './components/BjtLoadLineSim.vue'
import ActiveRecallQuiz from './components/ActiveRecallQuiz.vue'
import ExamBuilder from './components/ExamBuilder.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProgressTracker', ProgressTracker)
    app.component('PnJunctionSim', PnJunctionSim)
    app.component('DiodeLoadLineSim', DiodeLoadLineSim)
    app.component('BjtLoadLineSim', BjtLoadLineSim)
    app.component('ActiveRecallQuiz', ActiveRecallQuiz)
    app.component('ExamBuilder', ExamBuilder)
  }
} satisfies Theme
