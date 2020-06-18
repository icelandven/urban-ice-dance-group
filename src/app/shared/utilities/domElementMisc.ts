export function getContainerElement(element: string) {
    return new Promise((resolve, reject) => {
        waitForContainerElement(element, resolve);
    });
}

export function getContainerClassElement(className: string) {
    return new Promise((resolve, reject) => {
        waitForContainerClassElement(className, resolve);
    });
}

function waitForContainerElement(id, resolve) {
    const $configElement = document.getElementById(id);
    if (!$configElement) {
        setTimeout(waitForContainerElement.bind(this, id, resolve), 30);
    } else {
        resolve($configElement);
    }
}

function waitForContainerClassElement(className, resolve) {
    const $configElement = document.getElementsByClassName(className);
    if (!$configElement) {
        setTimeout(waitForContainerClassElement.bind(this, className, resolve), 30);
    } else {
        resolve($configElement);
    }
}
