import { Subject, filter } from 'rxjs'
import { reactive } from 'vue'

const EventService = reactive({
  emitter: new Subject(),
  on(eventName, callback) {
    this.emitter.pipe(filter((e) => e === eventName)).subscribe(callback)
  },
  fire(eventName) {
    this.emitter.next(eventName)
  },
})

export default EventService
