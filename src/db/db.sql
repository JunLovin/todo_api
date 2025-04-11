-- ? Tabla para guardas las tareas
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
);

INSERT INTO tasks (name, description)
VALUES ('Tarea 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

-- ? Tabla de tareas ya completadas
CREATE TABLE IF NOT EXISTS completedTasks (
    id SERIAL PRIMARY KEY,
    original_task_id INTEGER UNIQUE NOT NULL,
    created_at TIMESTAMP,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT true,
    FOREIGN KEY (original_task_id) REFERENCES tasks(id) ON DELETE CASCADE
)

-- ? Crear función del trigger
CREATE OR REPLACE FUNCTION move_completed_task()
RETURN TRIGGER AS $$
BEGIN
    IF NEW.completed = TRUE AND OLD.completed = FALSE THEN
        INSERT INTO completedTasks (id, original_task_id, created_at, name, description, completed)
        VALUES (OLD.id, OLD.id, OLD.created_at, OLD.name, OLD.description, OLD.completed)

        DELETE FROM tasks WHERE id = OLD.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ? Crear el trigger que se ejecuta después de una actualización en la tabla tasks
CREATE TRIGGER after_task_update
AFTER UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION move_completed_task()

-- Explicación del trigger:
-- - CREATE OR REPLACE FUNCTION move_completed_task(): Define o reemplaza una función llamada 'move_completed_task'.
-- - RETURNS TRIGGER AS $$ ... $$ LANGUAGE plpgsql;: Indica que esta es una función de trigger escrita en el lenguaje PL/pgSQL.
-- - BEGIN ... END;: Define el bloque de código de la función.
-- - IF NEW.completed = TRUE AND OLD.completed = FALSE THEN: Esta condición verifica si el valor de 'completed' ha cambiado de 'false' (OLD.completed) a 'true' (NEW.completed) en la fila actualizada.
-- - INSERT INTO completedTasks ...: Si la condición es verdadera, inserta una nueva fila en la tabla 'completedTasks' con los datos de la fila antigua (OLD).
-- - DELETE FROM tasks WHERE id = OLD.id;: Luego, elimina la fila correspondiente de la tabla 'tasks'.
-- - RETURN NEW;: Las funciones de trigger AFTER UPDATE usualmente devuelven NEW (la fila actualizada).
-- - CREATE TRIGGER after_task_update ...: Define el trigger llamado 'after_task_update'.
-- - AFTER UPDATE ON tasks: Especifica que este trigger se ejecutará después de una operación de UPDATE en la tabla 'tasks'.
-- - FOR EACH ROW: Indica que el trigger se ejecutará para cada fila que sea actualizada.
-- - EXECUTE FUNCTION move_completed_task(): Asocia la función 'move_completed_task' con este trigger.