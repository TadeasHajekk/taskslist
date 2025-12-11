document.addEventListener('DOMContentLoaded', () => {
    // 1. Získání odkazů na HTML elementy
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // 2. Funkce pro přidání nového úkolu
    function addTask() {
        // Získání hodnoty z textového pole a odstranění bílých mezer na okrajích
        const taskText = taskInput.value.trim();

        // Kontrola, zda uživatel zadal nějaký text
        if (taskText === "") {
            // Varování ve Star Wars stylu :)
            alert("Task je prázdný, mladý Padawane! Zadej platný úkol.");
            return; // Ukončí funkci, pokud je text prázdný
        }

        // Vytvoření nového prvku seznamu (<li>)
        const listItem = document.createElement('li');
        // Nastavení textu úkolu
        listItem.textContent = taskText;

        // --- Vytvoření Tlačítka pro Smazání ---
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'VYMAZAT';
        deleteButton.classList.add('delete-btn'); // Použijeme CSS styl pro tlačítko

        // Přidání Event Listeneru pro smazání úkolu
        deleteButton.addEventListener('click', function(event) {
            // event.target je tlačítko, parentElement je <li>, které chceme smazat
            taskList.removeChild(listItem);
        });

        // --- Přidání Event Listeneru pro Dokončení úkolu ---
        listItem.addEventListener('click', function() {
            // Přepíná (toggle) třídu 'completed'. Třída zajistí vizuální změnu v CSS.
            listItem.classList.toggle('completed');
        });

        // Vložení tlačítka do položky seznamu
        listItem.appendChild(deleteButton);
        
        // Vložení hotové položky do seznamu úkolů
        taskList.appendChild(listItem);

        // Vyčištění vstupního pole po přidání úkolu
        taskInput.value = '';
    }

    // 3. Přiřazení funkcí k událostem

    // Kliknutí na tlačítko "PŘIDAT TASK"
    addTaskButton.addEventListener('click', addTask);

    // Stisk klávesy Enter ve vstupním poli (pro rychlé přidávání)
    taskInput.addEventListener('keypress', function(event) {
        // 13 je kód pro klávesu Enter
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // POZNÁMKA: V reálném kódu bychom zde přidali i logiku pro ukládání do Local Storage
    // Kdybychom chtěli, aby úkoly zůstaly i po zavření prohlížeče.
});