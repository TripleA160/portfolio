export class TypeWriter {
    counter = 0;
    text = "";
    element = null;
    queue = [];

    write(
        element = document.createElement("div"),
        time = 100,
        primaryColorStart = null,
        primaryColorEnd = null,
        useElementText = true,
        text = ""
    ) {
        if (this.element != null && this.element != element) {
            const queueItem = {
                element: element,
                time: time,
                primaryColorStart: primaryColorStart,
                primaryColorEnd: primaryColorEnd,
                useElementText: false,
                text: element.innerText,
            };
            this.queue.push(queueItem);
            element.style.opacity = "0";
            return;
        }

        if (this.counter === 0) {
            this.element = element;
            this.element.classList.add("writing");
            this.text = useElementText ? element.innerText : text;
            this.element.innerHTML = "";
            element.style.opacity = "1";
        }

        if (this.counter < this.text.length) {
            let char = this.text.charAt(this.counter);
            let delay = /[.,،؟!…]/.test(char)
                ? this.randomizeTime(3 * time)
                : this.randomizeTime(time);

            if (
                primaryColorStart != null &&
                primaryColorEnd != null &&
                this.counter >= primaryColorStart &&
                this.counter <= primaryColorEnd
            ) {
                let newHTML =
                    this.text.slice(0, primaryColorStart) +
                    '<span class="primary-color-text">' +
                    this.text.slice(primaryColorStart, this.counter) +
                    this.text.charAt(this.counter);

                if (this.counter === primaryColorEnd) newHTML += "</span>";
                this.element.innerHTML = newHTML;
            } else this.element.innerHTML += this.text.charAt(this.counter);

            this.counter++;

            setTimeout(
                () =>
                    this.write(
                        this.element,
                        time,
                        primaryColorStart,
                        primaryColorEnd,
                        useElementText,
                        text
                    ),
                delay
            );
        } else {
            let char = this.text.charAt(this.counter);

            this.element.classList.remove("writing");
            this.element = null;
            this.counter = 0;

            if (this.queue.length) {
                const nextItem = this.queue.shift();
                let delay = /[.,،؟!…]/.test(char)
                    ? this.randomizeTime(6 * nextItem.time)
                    : this.randomizeTime(5 * nextItem.time);

                setTimeout(
                    () =>
                        this.write(
                            nextItem.element,
                            nextItem.time,
                            nextItem.primaryColorStart,
                            nextItem.primaryColorEnd,
                            nextItem.useElementText,
                            nextItem.text
                        ),
                    delay
                );
            } else return;
        }
    }

    randomizeTime(time = 100) {
        return time + Math.floor(Math.random() * time * 0.1);
    }
}
