export class TypeWriter {
  counter = 0;
  text = "";
  element = null;
  queue = [];

  write(
    element,
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
      element.innerHTML = "";
      return;
    }

    if (this.counter === 0) {
      this.element = element;
      this.element.classList.add("writing");
      this.text = useElementText ? element.innerText : text;
      this.element.innerHTML = "";
    }

    if (this.counter < this.text.length) {
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
        time
      );
    } else {
      this.element.classList.remove("writing");
      this.element = null;
      this.counter = 0;

      if (this.queue.length) {
        const nextItem = this.queue.shift();
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
          nextItem.time
        );
      } else return;
    }
  }
}
