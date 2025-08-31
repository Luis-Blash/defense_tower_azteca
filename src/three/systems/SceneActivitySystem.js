export default class SceneActivitySystem {
    constructor() {
        this.activities = new Map()
        this.currentActivity = null
    }

    start(scene) {
        this.scene = scene
    }

    registerActivity(key, ActivityClass, config = {}) {
        this.activities.set(key, { ActivityClass, config })
        return this
    }

    switchTo(activityKey) {
        if (this.currentActivity) {
            this.currentActivity.dispose?.()
            this.currentActivity = null
        }

        const activity = this.activities.get(activityKey)
        if (!activity) {
            console.warn(`Activity "${activityKey}" not found`)
            return
        }

        try {
            this.currentActivity = new activity.ActivityClass(this.scene, activity.config)
            this.currentActivity.start?.()

        } catch (error) {
            console.error(`Error creating activity "${activityKey}":`, error)
            this.currentActivity = null
        }
    }

    update(delta) {
        if (!this.currentActivity) return
        this.currentActivity.update?.(delta)
    }

    dispose() {
        if (this.currentActivity) {
            this.currentActivity.dispose?.()
            this.currentActivity = null
        }
        this.activities.clear()
    }
}