const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskCategory = document.getElementById("taskCategory");

const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");

const editModal = document.getElementById("editModel");
const closeModal = document.getElementById("closeModel");

const editTitle = document.getElementById("editTitle");
const editDescription = document.getElementById("editDescription");
const editCategory = document.getElementById("editCategory");

const updateTaskBtn = document.getElementById("updateTaskBtn");

const themeToggle = document.getElementById("themeToggle");

let taskId = 1;
let currentTask = null;

/* ADD TASK */

addTaskBtn.addEventListener("click", () => {

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const category = taskCategory.value;

    if (title === "") {
        alert("Enter task title");
        return;
    }

    createTask(
        title,
        description,
        category,
        "pending"
    );

    taskTitle.value = "";
    taskDescription.value = "";

    updateCounts();
});


/* CREATE TASK */

function createTask(
    title,
    description,
    category,
    status
) {

    const card =
        document.createElement("div");

    card.classList.add("task-card");

    card.setAttribute(
        "data-id",
        taskId
    );

    card.setAttribute(
        "data-status",
        status
    );

    card.setAttribute(
        "data-category",
        category
    );

    const heading =
        document.createElement("h3");

    heading.textContent = title;

    const desc =
        document.createElement("p");

    desc.textContent = description;

    const categoryText =
        document.createElement("p");

    categoryText.textContent =
        "Category : " + category;

    const badge =
        document.createElement("span");

    badge.classList.add(
        "badge",
        status
    );

    badge.textContent = status;

    const buttonBox =
        document.createElement("div");

    buttonBox.classList.add(
        "task-buttons"
    );

    buttonBox.innerHTML = `
        <button class="edit-btn">
            Edit
        </button>

        <button class="complete-btn">
            Complete
        </button>

        <button class="delete-btn">
            Delete
        </button>
    `;

    card.append(
        heading,
        desc,
        categoryText,
        badge,
        buttonBox
    );

    taskContainer.prepend(card);

    taskId++;
}


/* EVENT DELEGATION */

taskContainer.addEventListener(
    "click",
    (e) => {

        const card =
            e.target.closest(
                ".task-card"
            );

        if (!card) return;

        /* DELETE */

        if (
            e.target.classList.contains(
                "delete-btn"
            )
        ) {

            card.remove();

            updateCounts();
        }

        /* COMPLETE */

        if (
            e.target.classList.contains(
                "complete-btn"
            )
        ) {

            const badge =
                card.querySelector(
                    ".badge"
                );

            if (
                badge.textContent ===
                "pending"
            ) {

                badge.textContent =
                    "completed";

                badge.classList.remove(
                    "pending"
                );

                badge.classList.add(
                    "completed"
                );

                card.dataset.status =
                    "completed";

            } else {

                badge.textContent =
                    "pending";

                badge.classList.remove(
                    "completed"
                );

                badge.classList.add(
                    "pending"
                );

                card.dataset.status =
                    "pending";
            }

            updateCounts();
        }

        /* EDIT */

        if (
            e.target.classList.contains(
                "edit-btn"
            )
        ) {

            currentTask = card;

            editTitle.value =
                card.querySelector(
                    "h3"
                ).textContent;

            editDescription.value =
                card.querySelectorAll(
                    "p"
                )[0].textContent;

            editCategory.value =
                card.dataset.category;

            editModel.style.display =
                "flex";
        }

    }
);


/* UPDATE TASK */

updateTaskBtn.addEventListener(
    "click",
    () => {

        if (!currentTask) return;

        currentTask.querySelector(
            "h3"
        ).textContent =
            editTitle.value;

        currentTask.querySelectorAll(
            "p"
        )[0].textContent =
            editDescription.value;

        currentTask.querySelectorAll(
            "p"
        )[1].textContent =
            "Category : " +
            editCategory.value;

        currentTask.dataset.category =
            editCategory.value;

        editModel.style.display =
            "none";
    }
);


/* CLOSE MODAL */

closeModel.addEventListener(
    "click",
    () => {

        editModel.style.display =
            "none";

    }
);


/* SEARCH */

searchInput.addEventListener(
    "keyup",
    () => {

        const value =
            searchInput.value
            .toLowerCase();

        document
            .querySelectorAll(
                ".task-card"
            )
            .forEach(card => {

                const title =
                    card.querySelector(
                        "h3"
                    )
                    .textContent
                    .toLowerCase();

                card.style.display =
                    title.includes(value)
                    ? "block"
                    : "none";
            });

    }
);


/* FILTER */

filterCategory.addEventListener(
    "change",
    () => {

        const selected =
            filterCategory.value;

        document
            .querySelectorAll(
                ".task-card"
            )
            .forEach(card => {

                const category =
                    card.dataset.category;

                if (
                    selected === "All" ||
                    selected === category
                ) {

                    card.style.display =
                        "block";

                } else {

                    card.style.display =
                        "none";
                }

            });

    }
);


/* COUNTERS */

function updateCounts() {

    const tasks =
        document.querySelectorAll(
            ".task-card"
        );

    const completed =
        document.querySelectorAll(
            '[data-status="completed"]'
        );

    totalCount.textContent =
        tasks.length;

    completedCount.textContent =
        completed.length;

    pendingCount.textContent =
        tasks.length -
        completed.length;
}


/* THEME */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        themeToggle.textContent = "🌙 Dark";
    }else{
        themeToggle.textContent = "☀️ Light";
    }

});


/* ATTRIBUTES VS PROPERTIES */

document
.getElementById(
    "showDifference"
)
.addEventListener(
    "click",
    () => {

        const input =
            document.getElementById(
                "demoInput"
            );

        document.getElementById(
            "differenceResult"
        ).innerHTML =

            "Property Value : "
            + input.value +

            "<br><br>" +

            "Attribute Value : "
            + input.getAttribute(
                "value"
            );

    }
);


/* EVENT PROPAGATION */

document
.getElementById("child")
.addEventListener(
    "click",
    () => {
        console.log("Child");
    }
);

document
.getElementById("parent")
.addEventListener(
    "click",
    () => {
        console.log("Parent");
    }
);

document
.getElementById("grandparent")
.addEventListener(
    "click",
    () => {
        console.log("Grandparent");
    }
);


/* CAPTURING */

document
.getElementById("grandparent")
.addEventListener(
    "click",
    () => {
        console.log(
            "Capturing Grandparent"
        );
    },
    true
);

document
.getElementById("parent")
.addEventListener(
    "click",
    () => {
        console.log(
            "Capturing Parent"
        );
    },
    true
);

document
.getElementById("child")
.addEventListener(
    "click",
    () => {
        console.log(
            "Capturing Child"
        );
    },
    true
);