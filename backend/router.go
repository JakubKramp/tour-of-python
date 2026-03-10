func setupRouter() http.Handler {
    mux := http.NewServeMux()

    mux.HandleFunc("GET /api/lessons",        handlers.GetLessons)
    mux.HandleFunc("GET /api/lessons/{slug}", handlers.GetLesson)
    mux.HandleFunc("POST /api/execute",       handlers.Execute)
    mux.HandleFunc("GET /api/people/{slug}",  handlers.GetPerson)

    // Serve frontend static files
    fs := http.FileServer(http.Dir("../frontend/build"))
    mux.Handle("/", fs)

    return mux
}