document.addEventListener('DOMContentLoaded', () => {
    // 1. Získání odkazů na HTML elementy
    const taskInput = document.querySelector('#task');
    const submitButton = document.querySelector('#submit');
    const taskList = document.querySelector('#tasks');
    const form = document.querySelector('form');

    // --- Načtení úkolů z Local Storage při startu ---
    loadTasks();
    
    // Načte úkoly z Local Storage a zobrazí je
    function loadTasks() {
        // Získá data, nebo prázdné pole, pokud neexistují
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        tasks.forEach(task => {
            // Vytvoří a zobrazí úkol
            createTaskElement(task.text, task.completed);
        });
        
        // Načtení dokončeno, zkontrolujeme stav tlačítka
        checkInput();
    }
    
    // Uloží aktuální úkoly do Local Storage
    function saveTasks() {
        const listItems = taskList.querySelectorAll('li');
        const tasksToSave = [];
        
        listItems.forEach(item => {
            tasksToSave.push({
                text: item.firstChild.textContent, // Získáme text před tlačítkem
                completed: item.classList.contains('completed')
            });
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasksToSave));
    }

    // --- Logika pro aktivaci/deaktivaci tlačítka ---
    submitButton.disabled = true; // Výchozí stav (stejně jako v tvém kódu)

    taskInput.onkeyup = checkInput;
    
    function checkInput() {
        // Povolí tlačítko pouze, pokud má vstupní pole text
        if (taskInput.value.trim().length > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // --- Funkce pro vytvoření a přidání úkolu (pro opakované použití) ---
    function createTaskElement(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.textContent = taskText; // Nastaví text

        if (isCompleted) {
            li.classList.add('completed');
        }

        // --- Vytvoření Tlačítka pro Smazání ---
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'VYMAZAT';
        deleteButton.classList.add('delete-btn'); 

        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Zabrání spuštění události na nadřazeném <li>
            taskList.removeChild(li);
            saveTasks(); // Uložíme po smazání
        });

        // --- Event Listener pro Dokončení úkolu ---
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks(); // Uložíme po dokončení/vrácení
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
        
        return li;
    }
    
    // --- Odeslání formuláře (Přidání úkolu) ---
    form.onsubmit = () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            return false;
        }

        // 1. Vytvoří prvek a přidá ho
        createTaskElement(taskText);
        
        // 2. Uložíme aktuální seznam do Local Storage
        saveTasks();

        // 3. Vyčistí vstupní pole a deaktivuje tlačítko
        taskInput.value = '';
        submitButton.disabled = true;

        // Zastaví odeslání formuláře (zabrání refreshu stránky)
        return false;
    };
});